"use client";

import { FieldError, Input, Label, TextField } from "@heroui/react";
import { authClient, signIn } from "../../lib/auth-client";
import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { toast } from "react-toastify";

const SignInPage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { data, error } = await signIn.email({
            email: user.email,
            password: user.password,
            callbackURL: "/",
        });

        if (data) {
            toast.success("সাইন ইন সফল হয়েছে!");
            console.log(data);
        }

        if (error) {
            toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল, আবার চেষ্টা করুন!");
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
        });

        if (data) {
            toast.success("Google অ্যাকাউন্ট দিয়ে সফলভাবে সাইন ইন হয়েছে!");

        }
        if (error) {
            toast.error("Google অ্যাকাউন্ট দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন!");
        }
    }

    const handleGithubSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "github",
        });

        if (data) {
            toast.success("Github অ্যাকাউন্ট দিয়ে সফলভাবে সাইন ইন হয়েছে!");

        }
        if (error) {
            toast.error("Github অ্যাকাউন্ট দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন!");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-9">
            <div>
                <h2 className="text-4xl font-bold text-center mb-5">
                    সাইন ইন
                </h2>
                <p className="text-[16px] text-[#505150] text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

                <form onSubmit={onSubmit} className="bg-white mt-5 rounded-2xl p-8">
                    <fieldset className="fieldset rounded-box w-md p-4">


                        <label className="label text-[18px] text-black mb-2">
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
                            <Label className="text-[18px] font-semibold text-black mb-2">পাসওয়ার্ড</Label>
                            <Input placeholder="কমপক্ষে ৮ অক্ষর"
                                name="password"
                                type="password"
                                className="input w-md mb-3 rounded-md"
                                required

                            />
                            <FieldError className="text-xs text-red-500 mt-1" />
                        </TextField>



                        <button
                            type="submit"
                            className="btn btn-neutral text-[18px] bg-[#05893E] rounded-2xl text-white mt-4 border border-none"
                        >
                            সাইন ইন
                        </button>
                    </fieldset>

                    <div className="flex items-center my-5 text-[18px] text-zinc-600 font-bold uppercase tracking-wider before:flex-1 before:border-t before:border-zinc-200 before:mr-3 after:flex-1 after:border-t after:border-zinc-200 after:ml-3">
                        অথবা
                    </div>

                    <div className="flex justify-between">
                        <button onClick={handleGoogleSignIn} className="flex  gap-2 items-center p-6 font-bold btn text-black rounded-md mb-8">
                            <FcGoogle className="text-2xl" />
                            Google দিয়ে চালিয়ে যান
                        </button>
                        <button onClick={handleGithubSignIn} className="flex  gap-2 items-center p-6 font-bold btn text-black rounded-md mb-8">
                            <IoLogoGithub className="text-2xl" />
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <div className="text-center text-sm font-medium text-black">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/sign-up" className="text-[#008744] hover:underline font-bold transition">
                            সাইন আপ করুন
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

export default SignInPage;