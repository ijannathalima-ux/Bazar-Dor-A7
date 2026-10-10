"use client";

import { FieldError, Input, Label, TextField } from "@heroui/react";
import { signUp } from "../../lib/auth-client";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
        };

        const { data, error } = await signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            callbackURL: "/",
        });

        if (data) {
            console.log(data);
        }

        if (error) {
            console.log(error);
            toast.error("User already exists. Use another email")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-9">
            <div>
                <h2 className="text-4xl font-bold text-center mb-5">
                    অ্যাকাউন্ট তৈরি করুন
                </h2>
                <p className="text-[16px] text-[#505150] text-center">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

                <form onSubmit={onSubmit} className="bg-white mt-5 rounded-2xl p-8">
                    <fieldset className="fieldset rounded-box w-md p-4">
                        <label className="label text-[20px] text-black">
                            নাম
                        </label>

                        <input
                            name="name"
                            type="text"
                            className="input w-md mb-3 rounded-md"
                            placeholder="যেমন: রহিম উদ্দিন"
                            required
                        />

                        <label className="label text-[20px] text-black">
                            ইমেইল
                        </label>

                        <input
                            name="email"
                            type="email"
                            className="input w-md mb-3 rounded-md"
                            placeholder="you@example.com"
                            required
                        />

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "কমপক্ষে ৮ অক্ষর";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-zinc-700">পাসওয়ার্ড</Label>
                            <Input placeholder="কমপক্ষে ৮ অক্ষর"
                                name="password"
                                type="password"
                                className="input w-md mb-3 rounded-md"
                                required

                            />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>


                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "কমপক্ষে ৮ অক্ষর";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-zinc-700">পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <Input placeholder="আবার লিখুন"
                                name="password"
                                type="password"
                                className="input w-md mb-3 rounded-md"
                                required

                            />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>



                        <button
                            type="submit"
                            className="btn btn-neutral bg-[#05893E] rounded-2xl text-white mt-4 border border-none"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </button>
                    </fieldset>

                    <div className="flex items-center my-5 text-[16px] text-zinc-500 font-bold uppercase tracking-wider before:flex-1 before:border-t before:border-zinc-200 before:mr-3 after:flex-1 after:border-t after:border-zinc-200 after:ml-3">
                        অথবা
                    </div>

                    <div className="text-center text-sm font-medium text-zinc-600">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/sign-in" className="text-[#008744] hover:underline font-bold transition">
                            সাইন ইন করুন
                        </Link>
                    </div>

                </form>


                <Link
                    href="/"
                    className="mt-6 text-sm font-bold text-zinc-500 hover:text-[#008744] transition duration-200 block text-center"
                >
                    ← হোম পেজে ফিরে যান
                </Link>

            </div>
        </div>
    );
};

export default SignUpPage;