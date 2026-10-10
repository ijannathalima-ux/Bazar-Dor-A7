import Image from "next/image";
import UserInfoPage from "./UserInfo";

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


                <UserInfoPage/>

            </div>

        </nav>
    );
};

export default Navbar;