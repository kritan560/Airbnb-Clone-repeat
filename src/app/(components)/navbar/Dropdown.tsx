import DropdownStore from "@/app/store/dropdownStore";
import LoginStore from "@/app/store/loginStore";
import ModalStore from "@/app/store/modalStore";
import ScrollBarStore from "@/app/store/scrollBarStore";
import SignUpStore from "@/app/store/signupStore";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { SlPlane } from "react-icons/sl";
import { TbReservedLine } from "react-icons/tb";
import { SuccessToast, USER_LOGOUT_SUCCESS } from "../toast/Toast";

type DropdownProps = {
    className?: string;
    currentUser?: any;
};

const Style = {
    class: "group-hover:scale-125 group-active:scale-95 transition"
};

const Dropdown: React.FC<DropdownProps> = ({ className, currentUser }) => {
    const scrollBarStore = ScrollBarStore();
    const { theme } = useTheme();

    const userLoggedIn = [
        {
            logo: (
                <SlPlane
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: "My Trips"
        },
        {
            logo: (
                <MdFavorite
                    size={18}
                    className={`${Style.class} text-red-600`}
                />
            ),
            name: "My Favorites"
        },
        {
            logo: (
                <TbReservedLine
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: "My Reservations"
        },
        {
            logo: (
                <AiOutlinePropertySafety
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: "My Properties"
        },
        {
            logo: (
                <FaHome
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: "Airbnb My Home"
        },
        {
            logo: (
                <IoIosLogOut
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: `Logout (${currentUser ? currentUser.name : ""})`
        }
    ];

    const userNotLoggedIn = [
        {
            logo: (
                <IoIosLogIn
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: "Login"
        },
        {
            logo: (
                <IoPersonAddOutline
                    size={18}
                    className={`${Style.class} text-slate-800 dark:text-yellow-400`}
                />
            ),
            name: "SignUp"
        }
    ];

    const modalStore = ModalStore();
    const loginStore = LoginStore();
    const signupStore = SignUpStore();
    const router = useRouter();

    function handleModalOpen() {
        modalStore.onOpen();
    }

    const dropdownStore = DropdownStore();

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
        if (dropdown === `Logout (${currentUser ? currentUser.name : ""})`) {
            const logoutData = await signOut({
                redirect: false,
                callbackUrl: "/"
            });
            router.push(logoutData.url);
            scrollBarStore.setScrollBar(undefined);
            router.refresh();
            SuccessToast(theme, USER_LOGOUT_SUCCESS);
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

    // dropdown based on user login / logout status
    let dropDowns;
    if (currentUser) {
        dropDowns = userLoggedIn;
    } else {
        dropDowns = userNotLoggedIn;
    }

    // if dropDownStore is true
    return (
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
                className={`flex bg-slate-50 dark:bg-slate-700 shadow-sm rounded-md flex-col whitespace-nowrap`}
            >
                {dropDowns.map((dropdown, index) => (
                    <div
                        onClick={async () => {
                            await handleDropdownMenuClick(dropdown.name);
                        }}
                        key={index}
                        className={`hover:bg-slate-200 px-5 py-3 hover:cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600 transition
                    ${index == 0 && "rounded-t-md"}
                    ${dropdown.name == "Logout" && "border-t"}
                    ${index == dropDowns.length - 1 && "rounded-b-md"} 
                    group  
                    `}
                    >
                        <div className="flex gap-x-2 items-center">
                            {dropdown.logo}
                            {dropdown.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
