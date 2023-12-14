import DropdownStore from "@/app/store/dropdownStore";
import ModalStore from "@/app/store/modalStore";
import { useEffect, useState } from "react";

type DropdownProps = {
    className?: string;
};

const dropDowns = [
    "My Trips",
    "My Favorites",
    "My Reservations",
    "My Properties",
    "Airbnb My Home",
    "Logout"
];

const Dropdown: React.FC<DropdownProps> = ({ className }) => {
    const modalStore = ModalStore();
    function handleModalOpen() {
        modalStore.onOpen();
    }
    const dropdownStore = DropdownStore();
    let bodyContent;

    // should open immediatly
    // should close after a second

    // if dropDownStore is true
    bodyContent = (
        <div
            className={`${className} 
            transition-all duration-300 z-30
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
                            onClick={
                                dropdown == "Airbnb My Home"
                                    ? handleModalOpen
                                    : () => {}
                            }
                        >
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
