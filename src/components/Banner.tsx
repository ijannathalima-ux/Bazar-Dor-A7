"use client"
import Image from "next/image";

const Banner = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })

    return (
        <div className="container mx-auto px-4">

            <div className="p-4 sm:p-6 rounded-3xl mt-6 sm:mt-8 bg-white">

                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-4">

                    {/* left side */}
                    <div className="w-full lg:w-1/2">

                        <button className="text-[#05893E] bg-[#d5fae4] font-medium py-1 px-3 rounded-2xl mb-4">
                            {date}
                        </button>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 sm:mb-8">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="text-[#717171] text-base sm:text-lg lg:text-xl tracking-tight mb-5">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <button className="bg-[#05893E] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white text-base sm:text-xl">
                            সব পণ্য দেখুন
                        </button>

                    </div>

                    {/* right side */}
                    <div className="w-full lg:w-1/2 flex justify-center">

                        <Image
                            src={'/bazar-hero.png'}
                            alt="Banner Image"
                            height={500}
                            width={600}
                            className="w-full max-w-90 h-auto"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Banner;

