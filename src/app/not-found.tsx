import Link from "next/link";
import Image from "next/image";
import { LuMoveLeft } from "react-icons/lu";


const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-4 py-10">
            <div className="w-full max-w-lg text-center">

                <div className="mb-6 flex justify-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-4xl">
                        <Image
                            src={`/logo-icon.png`}
                            alt="Bazar-Dor Logo"
                            width={40}
                            height={40} />
                    </div>
                </div>

                <h1 className="text-8xl font-extrabold tracking-tight text-green-700 sm:text-9xl">404</h1>

                <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">পেজটি খুঁজে পাওয়া যায়নি!</h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                    দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
                    আপনার খোঁজা পেজটি এই মুহূর্তে খুঁজে পাওয়া যাচ্ছে না। ঠিকানাটি যাচাই করে আবার চেষ্টা করুন, অথবা বাজার দর-এর হোম পেজে ফিরে যান।
                </p>

                <Link href="/" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    <LuMoveLeft />
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default NotFound;