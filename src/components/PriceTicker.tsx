import Link from "next/link";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface PriceTickerType {
    id: string;
    category: string;
    categoryIcon: string;
    nameBn: string;
    categoryNameBn: string;
    today: number;
    unit: string;
    change: {
        dir: string;
        pct: number;
    };
}


const getUnitInBangla = (unit: string) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "dozen") return "প্রতি ডজন";
    if (unit === "litre" || unit === "liter") return "প্রতি লিটার";
    if (unit === "piece" || unit === "pcs") return "প্রতি পিস";

    return unit;
};

const PriceTicker = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products",
        {
            cache:"force-cache"
        }
    );
    const data = await res.json();
    const priceTicker: PriceTickerType[] = data;

    return (
        <div className="w-full overflow-hidden border-y border-gray-200 bg-white p-2">

            <MarqueeText direction="right" duration={10}>

                <div className="flex items-center gap-8">

                    {priceTicker.map((pt) => (

                        <Link href={`/product-details/${pt.id}`} key={pt.id}
                            className="flex items-center gap-2 text-[18px] font-semibold whitespace-nowrap hover:underline"
                        >
                            <span>{pt.categoryIcon}</span>

                            <span>{pt.nameBn}</span>

                            <span>টাকা {pt.today.toLocaleString("bn-BD")}</span>

                            <span className="text-gray-500">/ {getUnitInBangla(pt.unit)}</span>

                            <span
                                className={`flex items-center gap-1 ${pt.change.dir === "up"
                                    ? "text-[#1A9951]"
                                    : pt.change.dir === "down"
                                        ? "text-[#D03739]"
                                        : "text-gray-500"
                                    }`}
                            >
                                {pt.change.dir === "up" && (<IoCaretUpSharp />)}

                                {pt.change.dir === "down" && (<IoCaretDownSharp />)}

                                {pt.change.dir === "flat" && ("—")}

                                {pt.change.pct.toLocaleString("bn-BD")}%

                            </span>
                        </Link>
                    ))}

                </div>

            </MarqueeText>

        </div>
    );
};

export default PriceTicker;

