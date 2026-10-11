
import Link from "next/link";

interface NavMenuType {
    id: string;
    icon: string;
    nameBn: string;
}

const NavMenu = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories",
        {
            cache:"force-cache"
        }
    )
    const data = await res.json()
    const navLinks: NavMenuType[] = data

    return (
        <div className="border-b border-gray-200 bg-white p-3">

            <div className="container mx-auto flex flex-wrap  justify-center gap-2 sm:gap-3 md:justify-start">

                {
                    navLinks.map((links) =>
                        <Link
                            href={`/category/${links.id}`}
                            key={links.id}
                            className="rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-base md:text-[18px]"
                        >
                            <span>{links.icon}</span>
                            <span className="ml-1">{links.nameBn}</span>
                        </Link>
                    )
                }

            </div>

        </div>
    );
};

export default NavMenu;
