import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCaretUp, FaCaretDown, FaGreaterThan } from "react-icons/fa";

interface ProductDetailsType {
    id: string;
    image: string;
    category: string;
    nameBn: string;
    categoryNameBn: string;
    today: number;
    unit: string;
    yesterday: number;
    change: {
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

const getUnitInBangla = (unit: string) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "dozen") return "প্রতি ডজন";
    if (unit === "litre" || unit === "liter") return "প্রতি লিটার";
    if (unit === "piece" || unit === "pcs") return "প্রতি পিস";

    return unit;
};

const ProductDetailsPage = async ({ params }: { params: Promise<{ productId: string }>; }) => {

    const { productId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        notFound();
    }

    const data = await res.json();

    if (!data || !data.id || !data.nameBn) {
        notFound();
    }

    const productDetails: ProductDetailsType = data
    const markets = productDetails.markets ?? [];

    const minPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : productDetails.today;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : productDetails.today;

    const averagePrice = markets.length
        ? Math.round(
            markets.reduce(
                (total, market) => total + (market.min + market.max) / 2,
                0
            ) / markets.length
        )
        : productDetails.today;

    return (
        <div className="container mx-auto mt-8 px-4">

            {/* Breadcrumb Navigation */}
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <Link
                    href="/"
                    className="text-xl hover:text-[#05893E]"
                >
                    হোম
                </Link>

                <FaGreaterThan className="text-xs" />

                <Link
                    href={`/category/${productDetails.category}`}
                    className="text-xl hover:text-[#05893E]"
                >
                    {productDetails.categoryNameBn}
                </Link>

                <FaGreaterThan className="text-xs" />

                <span className="font-medium text-xl text-gray-800">
                    {productDetails.nameBn}
                </span>
            </nav>


            {/* Product Information */}
            <div className="rounded-2xl bg-white p-4 sm:p-8 mb-8 border border-[#E5E8E5]">
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-3">
                            <span className="text-5xl">
                                {productDetails.image}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xl font-semibold sm:text-2xl">
                                {productDetails.nameBn}
                            </span>

                            <span className="mt-1 text-base text-gray-500 sm:text-xl">
                                {getUnitInBangla(productDetails.unit)} ·{" "}
                                {productDetails.categoryNameBn}
                            </span>

                            <span className="mt-1 text-base sm:text-lg">
                                {productDetails.change.pct > 0
                                    ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${Math.abs(productDetails.today - productDetails.yesterday).toLocaleString("bn-BD")} টাকা`
                                    : productDetails.change.pct < 0
                                        ? `গতকালের তুলনায় আজ দাম কমেছে · ${Math.abs(productDetails.today - productDetails.yesterday).toLocaleString("bn-BD")} টাকা`
                                        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-4 lg:min-w-48 lg:text-center">
                        <h2>আজকের দাম</h2>

                        <p className="text-2xl font-semibold">
                            {productDetails.today.toLocaleString("bn-BD")} টাকা
                        </p>

                        <p className="text-sm text-gray-500">
                            {getUnitInBangla(productDetails.unit)}
                        </p>

                        <span
                            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${productDetails.change.pct > 0
                                ? "bg-red-50 text-red-700"
                                : productDetails.change.pct < 0
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            {productDetails.change.pct > 0 ? (
                                <FaCaretUp />
                            ) : productDetails.change.pct < 0 ? (
                                <FaCaretDown />
                            ) : null}

                            {productDetails.change.pct.toLocaleString("bn-BD")}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Price Summary */}
            <div className="rounded-2xl bg-white p-4 sm:p-8 border border-[#E5E8E5]">
                <h2 className="mt-6 text-xl font-bold">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-[#E5E8E5] p-4">
                        <p className="text-gray-500">সর্বনিম্ন দাম</p>
                        <span className="text-xl font-semibold">
                            <span className="text-red-600 text-2xl"> {minPrice.toLocaleString("bn-BD")} </span>টাকা
                        </span>
                        <p className="mt-1 text-sm text-gray-500">
                            সবচেয়ে কম দামের বাজার
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E5E8E5] p-4">
                        <p className="text-gray-500">সর্বাধিক দাম</p>
                        <span className="text-xl font-semibold">
                            <span className="text-red-600 text-2xl"> {maxPrice.toLocaleString("bn-BD")} </span>টাকা
                        </span>
                        <p className="mt-1 text-sm text-gray-500">
                            সবচেয়ে বেশি দামের বাজার
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#E5E8E5] p-4">
                        <p className="text-gray-500">গড় দাম</p>
                        <span className="text-xl font-semibold">
                            <span className="text-red-600 text-2xl">{averagePrice.toLocaleString("bn-BD")}</span> টাকা
                        </span>
                        <p className="mt-1 text-sm text-gray-500">
                            বাজারগুলোর গড় আনুমানিক দাম
                        </p>
                    </div>
                </div>

                {/* Market Prices */}

                <h2 className="mt-6 text-xl font-bold">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                <div className="mt-4 overflow-x-auto rounded-xl border border-[#E5E8E5]">
                    <table className="w-full min-w-162 text-left text-sm">
                        <thead className="bg-white text-gray-600 ">
                            <tr>
                                <th className="p-4 font-bold text-[17px]">বাজার</th>
                                <th className="p-4 font-bold text-[17px]">বিভাগ</th>
                                <th className="p-4 text-right font-bold text-[17px]">সর্বনিম্ন</th>
                                <th className="p-4 text-right font-bold text-[17px] ">সর্বাধিক</th>
                                <th className="p-4 text-right font-bold text-[17px]">গড়</th>
                            </tr>
                        </thead>

                        <tbody>

                            {[...markets].sort((a, b) => (a.min + a.max) / 2 - (b.min + b.max) / 2)

                                .map((market, index) => {
                                    const average = (market.min + market.max) / 2;


                                    return (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className="border-t border-[#a1a1a1] even:bg-[#F0F5F0]"
                                        >
                                            <td className="p-4 font-semibold text-[15px]">
                                                {market.market}
                                            </td>

                                            <td className="p-4 font-semibold text-[15px]">
                                                {market.division}
                                            </td>

                                            <td className="p-4 text-right font-semibold text-[15px]">
                                                {market.min.toLocaleString("bn-BD")} টাকা
                                            </td>

                                            <td className="p-4 text-right font-semibold text-[15px]">
                                                {market.max.toLocaleString("bn-BD")} টাকা
                                            </td>

                                            <td className="p-4 text-right font-semibold text-[15px]">
                                                {average.toLocaleString("bn-BD")} টাকা
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default ProductDetailsPage;

