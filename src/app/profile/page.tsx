"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuCornerDownLeft } from "react-icons/lu";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");

    const router = useRouter();

    const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await authClient.updateUser({
                name: name,
            });

            toast.success("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        } catch {
            toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন!");
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("আপনি সফলভাবে সাইন আউট করেছেন!");
                    router.push("/sign-in");
                },
                onError: () => {
                    toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন!");
                }
            },
        });
    };

    return (
        <div className="container mx-auto my-10 max-w-2xl px-4">
            <h1 className="text-3xl font-bold text-gray-900">
                আমার প্রোফাইল
            </h1>

            <p className="text-[17px] text-gray-600">
                আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-3 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-4">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={64}
                                height={64}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#05893E] text-2xl font-bold text-white">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {user?.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex gap-2 rounded-md border border-red-400 px-4 py-2 font-semibold text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                        <LuCornerDownLeft />
                        সাইন আউট
                    </button>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleUpdate} className="space-y-6">
                    <h2 className="text-2xl font-bold">তথ্য</h2>

                    <div>
                        <label className="mb-2 block text-base font-semibold text-gray-800">
                            নাম
                        </label>

                        <input
                            type="text"
                            value={name || user?.name || ""}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#05893E] py-3.5 text-lg font-semibold text-white shadow-md transition hover:bg-[#047233]"
                    >
                        আপডেট
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
