
import Link from "next/link";
import { FaCaretUp } from "react-icons/fa";

interface AllProductsType {
    id: string;
    image: string;
    category:string;
    nameBn: string;
    today: number;
    unit: string;
    change: {
        pct: number;
    };
}

const getUnitInBangla = (unit: string) => {

    if (unit === "kg") {
        return "প্রতি কেজি";
    }

    if (unit === "dozen") {
        return "প্রতি ডজন";
    }

    if (unit === "litre" || unit === "liter") {
        return "প্রতি লিটার";
    }

    if (unit === "piece" || unit === "pcs") {
        return "প্রতি পিস";
    }

    return unit;
};




const AllProducts = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

    const data = await res.json();

    const products: AllProductsType[] = data;

    return (
        <div id="সব পণ্য" className="container mx-auto mt-8">

            {/* Heading */}
            <div className="grid gap-2 items-center mb-5">

                <h2 className="text-2xl sm:text-3xl font-bold">
                    সব পণ্য
                </h2>
                <p className="text-[#3d3f3d] text-xl">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {products.map((product) => (
                    <Link href={`/product-details/${product.id}`}
                        key={product.id}
                        className="bg-white border border-[#E5E8E5] rounded-2xl p-4 sm:p-5 hover:scale-105 transition-transform duration-300 hover:border hover:border-[#04bb53]"
                    >

                        <div className="flex items-center gap-3 mb-5">

                            <div className="bg-gray-100 p-3 rounded-lg">
                                <span className="text-3xl">
                                    {product.image}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl font-semibold">
                                    {product.nameBn}
                                </span>
                                <span className="mt-1 text-xl text-gray-500">
                                    {getUnitInBangla(product.unit)}
                                </span>
                            </div>

                        </div>

                        <p className="text-xl mb-2">
                            আজকের দাম
                        </p>

                        <div className="flex justify-between items-center gap-2">

                            <span className="text-xl font-semibold">
                                {product.today.toLocaleString("bn-BD")} টাকা

                            </span>

                            <span className="flex items-center gap-1 rounded-full bg-red-50 text-red-700 px-2 py-1 text-sm font-semibold">
                                <FaCaretUp />
                                {product.change.pct.toLocaleString("bn-BD")}%
                            </span>

                        </div>

                    </Link>
                ))}

            </div>

        </div>
    );
};

export default AllProducts;

