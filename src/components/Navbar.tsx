"use client"
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    });

    return (
        <nav className="border-b border-gray-200 bg-white p-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center container mx-auto">

                {/* Logo + Name + Date */}
                <div className="flex gap-2 items-center">

                    <Image
                        src={"/logo-icon.png"}
                        alt="BazarDor Logo"
                        width={40}
                        height={40}
                        className="bg-[#05893E] p-2 w-14 h-14 sm:w-15 sm:h-15 rounded-xl"
                    />

                    <div className="flex flex-col">

                        <span className="text-2xl sm:text-3xl font-bold">
                            বাজার দর
                        </span>

                        <span className="text-sm sm:text-base">
                            {date}
                        </span>

                    </div>

                </div>


                {/* Auth Buttons */}
                <div className="flex gap-2 sm:gap-3 items-center">

                    <Link
                        href="/signin"
                        className="text-base sm:text-[20px] font-semibold py-2 px-4 sm:py-3 sm:px-6"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="text-base sm:text-[19px] font-semibold bg-[#05893E] text-white rounded-md py-2 px-4 sm:py-3 sm:px-6"
                    >
                        সাইন আপ
                    </Link>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;