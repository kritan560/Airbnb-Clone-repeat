import DropdownStore from "@/app/store/dropdownStore";
import ModalStore from "@/app/store/modalStore";
import LoginModal from "../modal/LoginModal";
import LoginStore from "@/app/store/loginStore";
import SignUpStore from "@/app/store/signupStore";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SlPlane } from "react-icons/sl";
import { MdFavorite } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbReservedLine } from "react-icons/tb";
import { VscSymbolProperty } from "react-icons/vsc";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";

type DropdownProps = {
    className?: string;
    currentUser?: any;
};

const dropDowns = [
    { logo: SlPlane, name: "My Trips" },
    { logo: MdFavorite, name: "My Favorites" },
    { logo: TbReservedLine, name: "My Reservations" },
    { logo: VscSymbolProperty, name: "My Properties" },
    { logo: FaHome, name: "Airbnb My Home" },
    { logo: IoIosLogOut, name: "Logout" }
];

const userNotLoggedIn = [
    { logo: IoIosLogIn, name: "Login" },
    { logo: IoPersonAddOutline, name: "SignUp" }
];

const Dropdown: React.FC<DropdownProps> = ({ className, currentUser }) => {
    const modalStore = ModalStore();
    const loginStore = LoginStore();
    const signupStore = SignUpStore();
    const router = useRouter();

    function handleModalOpen() {
        modalStore.onOpen();
    }

    const dropdownStore = DropdownStore();
    let bodyContent;

    async function handleDropdownMenuClick(dropdown: string) {
        if (dropdown === "Airbnb My Home") {
            return handleModalOpen();
        }
        if (dropdown === "Login") {
            return loginStore.onOpen();
        }
        if (dropdown === "SignUp") {
            return signupStore.onOpen();
        }
        if (dropdown === "Logout") {
            return await signOut();
        }
        if (dropdown === "My Trips") {
            return router.push("/trips");
        }
        if (dropdown === "My Favorites") {
            return router.push("/favorites");
        }
        if (dropdown === "My Reservations") {
            return router.push("/reservations");
        }
        if (dropdown === "My Properties") {
            return router.push("/properties");
        }
    }

    // if dropDownStore is true
    if (currentUser) {
        return (bodyContent = (
            <div
                className={`${className} 
            transition-all z-30
            ${
                dropdownStore.isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
            }
            `}
            >
                <div
                    className={`flex bg-white border-b border-l border-r shadow-sm rounded-md flex-col whitespace-nowrap`}
                >
                    {dropDowns.map((dropdown, index) => (
                        <div
                            onClick={async () => {
                                await handleDropdownMenuClick(dropdown.name);
                            }}
                            key={index}
                            className={`hover:bg-slate-200 px-5 py-3 hover:cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 transition
                    ${index == 0 && "rounded-t-md"}
                    ${dropdown.name == "Logout" && "border-t"}
                    ${index == dropDowns.length - 1 && "rounded-b-md"}   
                    `}
                        >
                            <div className="flex gap-x-2 items-center">
                                <dropdown.logo size={17} />
                                {dropdown.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    }

    bodyContent = (
        <div
            className={`${className} 
            transition-all z-30
            ${
                dropdownStore.isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
            }
            `}
        >
            <div
                className={`flex bg-white border-b border-l border-r shadow-sm rounded-md flex-col whitespace-nowrap`}
            >
                {userNotLoggedIn.map((dropdown, index) => (
                    <div
                        onClick={() => handleDropdownMenuClick(dropdown.name)}
                        key={index}
                        className={`hover:bg-slate-200 px-5 py-3 hover:cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 transition
                    ${index == 0 && "rounded-t-md"}
                    ${dropdown.name == "Logout" && "border-t"}
                    ${index == userNotLoggedIn.length - 1 && "rounded-b-md"}   
                    `}
                    >
                        <div className="flex gap-x-2 items-center">
                                <dropdown.logo size={17} />
                                {dropdown.name}
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
    return bodyContent;
};
export default Dropdown;
