import DropdownStore from "@/app/store/dropdownStore";
import ModalStore from "@/app/store/modalStore";
import LoginModal from "../modal/LoginModal";
import LoginStore from "@/app/store/loginStore";
import SignUpStore from "@/app/store/signupStore";
import { signOut } from "next-auth/react";

type DropdownProps = {
    className?: string;
    currentUser?: any;
};

const dropDowns = [
    "My Trips",
    "My Favorites",
    "My Reservations",
    "My Properties",
    "Airbnb My Home",
    "Logout"
];

const userNotLoggedIn = ["Login", "SignUp"];

const Dropdown: React.FC<DropdownProps> = ({ className, currentUser }) => {
    const modalStore = ModalStore();
    const loginStore = LoginStore();
    const signupStore = SignUpStore();

    function handleModalOpen() {
        modalStore.onOpen();
    }

    const dropdownStore = DropdownStore();
    let bodyContent;

    async function handleDropdownMenuClick(dropdown: string) {
        if (dropdown == "Airbnb My Home") {
            handleModalOpen();
        } else if (dropdown == "Login") {
            loginStore.onOpen();
        } else if (dropdown == "SignUp") {
            signupStore.onOpen();
        } else if (dropdown == "Logout") {
            await signOut();
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
                            key={index}
                            className={`hover:bg-slate-200 px-5 py-3 hover:cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 transition
                    ${index == 0 && "rounded-t-md"}
                    ${dropdown == "Logout" && "border-t"}
                    ${index == dropDowns.length - 1 && "rounded-b-md"}   
                    `}
                        >
                            <div
                                onClick={() =>
                                    handleDropdownMenuClick(dropdown)
                                }
                            >
                                {dropdown}
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
                        key={index}
                        className={`hover:bg-slate-200 px-5 py-3 hover:cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 transition
                    ${index == 0 && "rounded-t-md"}
                    ${dropdown == "Logout" && "border-t"}
                    ${index == userNotLoggedIn.length - 1 && "rounded-b-md"}   
                    `}
                    >
                        <div onClick={() => handleDropdownMenuClick(dropdown)}>
                            {dropdown}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    return bodyContent;
};
export default Dropdown;
