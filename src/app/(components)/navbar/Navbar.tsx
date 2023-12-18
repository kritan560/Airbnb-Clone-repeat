"use client";

import Image from "next/image";
import { IoSearchCircleSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import ModalStore from "@/app/store/modalStore";
import Dropdown from "./Dropdown";
import DropdownStore from "@/app/store/dropdownStore";
import { useEffect, useRef } from "react";
import FilterModalStore from "@/app/store/filterModalStore";
import { useRouter } from "next/navigation";
import ScrollBarStore from "@/app/store/scrollBarStore";

const Navbar = () => {
    const modalStore = ModalStore();
    const dropdownStore = DropdownStore();
    const dropDownToggleRef = useRef<HTMLDivElement>(null);
    const filterModalStore = FilterModalStore();
    const router = useRouter();

    const handleModalOpen = () => {
        return modalStore.onOpen();
    };

    const handleDropDownToggle = () => {
        if (dropdownStore.isOpen) {
            dropdownStore.onClose();
        } else if (!dropdownStore.isOpen) {
            dropdownStore.onOpen();
        }
    };

    // when clicked on document except dropDownToggleRef close the dropdown
    const handleDropDownClose = (e: MouseEvent) => {
        if (!dropDownToggleRef.current?.contains(e.target as Node)) {
            setTimeout(() => {
                dropdownStore.onClose();
            }, 100);
        }
    };

    function handleFilterModal() {
        filterModalStore.onOpen();
    }

    useEffect(() => {
        document.addEventListener("click", handleDropDownClose);
    }, []);

    // the underline under selected scrollbar items
    const scrollBarStore = ScrollBarStore();
    function handleLogoClick() {
        router.push("/");
        scrollBarStore.setScrollBar(undefined);
        filterModalStore.setDays(undefined);
        filterModalStore.setLocation(undefined);
        filterModalStore.setGuest(undefined);
    }

    // display numbers in filter navbar
    const guest = filterModalStore.guest;
    const days = filterModalStore.days;
    const location = filterModalStore.location;

    return (
        <>
            <div className="flex justify-around items-center py-4 border-b">
                {/* logo */}
                <div className="hover:cursor-pointer" onClick={handleLogoClick}>
                    <Image
                        src={"/images/logo.png"}
                        width={100}
                        height={100}
                        alt="logo"
                        priority
                    />
                </div>

                {/* filter content */}
                <div
                    className="flex items-center gap-x-3 border rounded-full pl-4 pr-1 py-[2px] hover:cursor-pointer hover:shadow-md shadow-sm text-sm font-semibold text-slate-600 transition"
                    onClick={handleFilterModal}
                >
                    <span>{location ? location : "AnyWhere"}</span>
                    <span>|</span>
                    <div>
                        <span className={`${days && "mr-1"}`}>{days}</span>
                        <span>{days ? "Days" : "Any Week"}</span>
                    </div>
                    <span>|</span>
                    <div className="flex gap-x-1 items-center">
                        <div>
                            <span className={`${guest && "mr-1"}`}>
                                {guest}
                            </span>
                            <span>{days ? "Guests" : "Add Guest"}</span>
                        </div>
                        <IoSearchCircleSharp
                            size={40}
                            className="text-red-600"
                        />
                    </div>
                </div>

                {/* hamburger and airbnb logo */}
                <div className="flex gap-x-6 items-center">
                    <p
                        className="hover:cursor-pointer text-slate-600 text-sm font-semibold py-3 transition px-4 rounded-full hover:bg-slate-300 active:bg-slate-400"
                        onClick={handleModalOpen}
                    >
                        Airbnb Your Home
                    </p>

                    {/* hamburger menu */}
                    <div
                        className="flex gap-x-2 items-center border rounded-full px-2 py-1 relative hover:cursor-pointer select-none hover:shadow-md hover:text-slate-700 text-slate-800 active:bg-slate-50 active:shadow-lg transition"
                        onClick={handleDropDownToggle}
                        ref={dropDownToggleRef}
                    >
                        <GiHamburgerMenu className="" />
                        <Image
                            src={"/images/placeholder.jpg"}
                            width={30}
                            height={30}
                            alt="placeholder"
                            className="rounded-full"
                        />
                        <Dropdown className="absolute top-10 left-0 hover:shadow-md" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;
