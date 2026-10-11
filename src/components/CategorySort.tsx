"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface CategoriesType {
    id: string;
    image: string;
    nameBn: string;
    today: number;
    unit: string;
    categoryNameBn: string;
    categoryIcon: string;
    change: {
        pct: number;
    };
}

interface CategorySortProps {
    products: CategoriesType[];
}

const getUnitInBangla = (unit: string) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "dozen") return "প্রতি ডজন";
    if (unit === "litre" || unit === "liter") return "প্রতি লিটার";
    if (unit === "piece" || unit === "pcs") return "প্রতি পিস";

    return unit;
};

const CategorySort = ({ products }: CategorySortProps) => {
    const [sortBy, setSortBy] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "price-low") {
            return a.today - b.today;
        }

        if (sortBy === "price-high") {
            return b.today - a.today;
        }

        if (sortBy === "name") {
            return a.nameBn.localeCompare(b.nameBn, "bn");
        }

        return 0;
    });

    return (
        <>
            {/* Sorting Box */}
            <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-[#E5E8E5] bg-white p-4 sm:flex-row sm:items-center sm:justify-end">
                <label htmlFor="sort" className="text-xl text-gray-500">
                    সাজান
                </label>

                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-[#E5E8E5] bg-white px-2 py-3 text-[17px] outline-none"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-low">দাম: কম থেকে বেশি</option>
                    <option value="price-high">দাম: বেশি থেকে কম</option>
                    <option value="name">নাম অনুযায়ী</option>
                </select>
            </div>

            {/* Product Count */}
            <p className="mb-3 text-xl text-[#3d3f3d]">
                মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Product Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((category) => (
                    <Link href={`/product-details/${category.id}`}
                        key={category.id}
                        className="rounded-2xl border border-[#E5E8E5] bg-white p-4 transition-transform duration-300 hover:scale-105 hover:border-green-400 sm:p-5"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-gray-100 p-3">
                                <span className="text-3xl">
                                    {category.image}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-lg font-semibold sm:text-xl">
                                    {category.nameBn}
                                </span>

                                <span className="mt-1 text-xl text-gray-500">
                                    {getUnitInBangla(category.unit)}
                                </span>
                            </div>
                        </div>

                        <p className="mb-2 text-xl">আজকের দাম</p>

                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xl font-semibold">
                                {category.today.toLocaleString("bn-BD")} টাকা
                            </span>

                            <span
                                className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${category.change.pct > 0
                                    ? "bg-green-50 text-green-700"
                                    : category.change.pct < 0
                                        ? "bg-red-50 text-red-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {category.change.pct > 0 ? (
                                    <FaCaretUp />
                                ) : category.change.pct < 0 ? (
                                    <FaCaretDown />
                                ) : null}

                                {category.change.pct.toLocaleString("bn-BD")}%
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CategorySort;

