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

    // when clicked on body except dropDownToggleRef close the dropdown
    const handleDropDownClose = (e: MouseEvent) => {
        if (!dropDownToggleRef.current?.contains(e.target as Node)) {
            dropdownStore.onClose();
        }
    };

    function handleFilterModal() {
        filterModalStore.onOpen();
    }

    useEffect(() => {
        document.addEventListener("click", handleDropDownClose);
    }, []);

    return (
        <main>
            <div className="flex justify-around items-center py-4 border-b w-full">
                {/* logo */}
                <div className="hover:cursor-pointer" onClick={() => router.push("/")}>
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
                    className="flex items-center gap-x-3 border rounded-full pl-4 pr-1 py-1 hover:cursor-pointer hover:shadow-md shadow-sm text-sm font-semibold text-slate-600 transition"
                    onClick={handleFilterModal}
                >
                    <span>AnyWhere</span>
                    <span>|</span>
                    <span>Any Week</span>
                    <span>|</span>
                    <div className="flex gap-x-3 items-center">
                        <span>Add Guests</span>
                        <IoSearchCircleSharp
                            size={38}
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
                    <div
                        className="flex gap-x-2 items-center border rounded-full px-2 py-1 relative hover:cursor-pointer select-none hover:shadow-md hover:text-slate-700 text-slate-800"
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
                        <Dropdown className="absolute top-10 -right-10 hover:shadow-md" />
                    </div>
                </div>
            </div>
        </main>
    );
};
export default Navbar;
