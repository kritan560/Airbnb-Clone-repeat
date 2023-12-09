import Image from "next/image";
import { IoSearchCircleSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    return (
        <main>
            <div className="flex justify-around items-center py-4 border-b">
                {/* logo */}
                <div>
                    <Image
                        src={"/images/logo.png"}
                        width={100}
                        height={100}
                        alt="logo"
                    />
                </div>
                {/* filter content */}
                <div className="flex items-center gap-x-3 border rounded-full pl-4 pr-1 py-1">
                    <span>AnyWhere</span>
                    <span>|</span>
                    <span>Any Week</span>
                    <span>|</span>
                    <div className="flex gap-x-3 items-center">
                        <span>Add Guests</span>
                        <IoSearchCircleSharp size={38} />
                    </div>
                </div>
                {/* hamburger and airbnb logo */}
                <div className="flex gap-x-6 items-center">
                    <p>Airbnb Your Home</p>
                    <div className="flex gap-x-2 items-center border rounded-full px-2 py-1">
                        <GiHamburgerMenu />
                        <Image
                            src={"/images/placeholder.jpg"}
                            width={30}
                            height={30}
                            alt="placeholder"
                            className="rounded-full"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};
export default Navbar;
