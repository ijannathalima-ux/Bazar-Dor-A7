
import { FaCaretUp } from "react-icons/fa";

interface RisingProductsType {
    id: string;
    image: string;
    nameBn: string;
    today: number;
    unit: string;
    change: {
        pct: number;
    }
}

const RisingProducts = async () => {

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data = await res.json();

    const filteredProducts: RisingProductsType[] = data
        .filter((product: RisingProductsType) => product.change.pct > 0)
        .sort((a: RisingProductsType, b: RisingProductsType) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <div className="container mx-auto mt-8">

            {/* Heading */}
            <div className="flex gap-2 items-center mb-5">
                <FaCaretUp className="text-red-700 text-3xl sm:text-4xl" />
                <h2 className="text-2xl sm:text-3xl font-bold">
                    আজ দাম বেড়েছে
                </h2>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {filteredProducts.map((rising) => (
                    <div
                        key={rising.id}
                        className="bg-white rounded-2xl p-4 sm:p-5"
                    >

                        <div className="flex items-center gap-3 mb-5">

                            <div className="bg-gray-100 p-3 rounded-lg">
                                <span className="text-3xl">
                                    {rising.image}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl font-semibold">
                                    {rising.nameBn}
                                </span>
                                <span className="mt-1 text-xl text-gray-500">
                                  প্রতি {rising.unit}
                                </span>
                            </div>

                        </div>

                        <p className="text-xl mb-2">
                            আজকের দাম
                        </p>

                        <div className="flex justify-between items-center gap-2">

                            <span className="text-xl font-semibold">
                                {rising.today} টাকা
                                
                            </span>

                            <span className="flex items-center gap-1 rounded-full bg-red-50 text-red-700 px-2 py-1 text-sm font-semibold">
                                <FaCaretUp />
                                {rising.change.pct}%
                            </span>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default RisingProducts;

