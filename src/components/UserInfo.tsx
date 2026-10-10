"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const UserInfoPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    return (
        <div>
            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 rounded-lg p-2"
                    >
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#05893E] text-sm font-bold text-white">
                                {user.name?.charAt(0) || "U"}
                            </div>
                        )}

                        <span className="text-sm font-semibold text-gray-800">
                            {user.name}
                        </span>

                       <IoMdArrowDropdown />

                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                            <div className="border-b border-gray-100 pb-3">
                                <p className="font-semibold text-gray-900">
                                    {user.name}
                                </p>

                                <p className="mt-1 truncate text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 block rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                👤 আমার প্রোফাইল
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="w-full rounded-lg px-2 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                            >
                                ↩ সাইন আউট
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/sign-in"
                        className="px-4 py-2 text-base font-semibold sm:px-6 sm:py-3 sm:text-xl"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign-up"
                        className="rounded-md bg-[#05893E] px-4 py-2 text-base font-semibold text-white sm:px-6 sm:py-3 sm:text-lg"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfoPage;
