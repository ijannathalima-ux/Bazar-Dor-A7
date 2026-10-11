import CategorySort from "@/components/CategorySort";
import { notFound } from "next/navigation";

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

const CategoriesPage = async ({ params, }: { params: Promise<{ categoryId: string }> }) => {

    const { categoryId } = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`);

    if (!res.ok) {
        notFound();
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
        notFound();
    }

    const categories: CategoriesType[] = data;

    const categoryName = categories[0]?.categoryNameBn;

    const categoryIcon = categories[0]?.categoryIcon;

    return (
        <div className="container mx-auto mt-8 px-4">

            {/* Category Heading */}
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#E5E8E5] bg-white p-4 transition-transform duration-300 hover:border-green-400 sm:p-5">
                <span className="text-4xl">{categoryIcon}</span>

                <div>
                    <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{categoryName}</h1>
                    <p className="text-base text-gray-500 sm:text-xl">{categories.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>

            {/* Sorting and Product Cards */}
            <CategorySort products={categories} />
        </div>
    );
};

export default CategoriesPage;

