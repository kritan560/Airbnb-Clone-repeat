"use client";

import DropdownStore from "@/app/store/dropdownStore";
import FilterModalStore from "@/app/store/filterModalStore";
import ModalStore from "@/app/store/modalStore";
import ScrollBarStore from "@/app/store/scrollBarStore";
import SignUpStore from "@/app/store/signupStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchCircleSharp } from "react-icons/io5";
import { ModeToggle } from "../theme/ShadCnSwitch";
import Dropdown from "./Dropdown";

type NavbarProps = {
    currentUser?: any;
};

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    const modalStore = ModalStore();
    const dropdownStore = DropdownStore();
    const dropDownToggleRef = useRef<HTMLDivElement>(null);
    const filterModalStore = FilterModalStore();
    const router = useRouter();
    const signupStore = SignUpStore();

    const handleModalOpen = () => {
        if (!currentUser) {
            return signupStore.onOpen();
        }
        return modalStore.onOpen();
    };

    const handleDropDownToggle = () => {
        if (dropdownStore.isOpen) {
            // settimeout is used to complete the animation in dropdown
            setTimeout(() => {
                dropdownStore.onClose();
            }, 170);
        } else if (!dropdownStore.isOpen) {
            dropdownStore.onOpen();
        }
    };

    // when clicked on document except dropDownToggleRef close the dropdown
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

    // when logged in with social network use those image

    return (
        <>
            <div className="flex justify-between items-center py-4 border-b px-4 md:px-14 lg:px-24 min-w-[350px] ">
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
                    className="flex items-center gap-x-3 border rounded-full pl-4 pr-1 py-3 sm:py-[2px] hover:cursor-pointer hover:shadow-md shadow-sm text-sm font-semibold text-slate-600 transition select-none dark:text-slate-100"
                    onClick={handleFilterModal}
                >
                    <span className="mr-3">
                        {location ? location : "AnyWhere"}
                    </span>

                    <span className="hidden sm:flex">|</span>

                    <div className="hidden sm:flex">
                        <span className={`${days && "mr-1"}`}>{days}</span>
                        <span className="mr-3 sm:mr-0">
                            {days ? "Days" : "Any Week"}
                        </span>
                    </div>

                    <span className="hidden sm:flex">|</span>

                    <div className=" gap-x-1 items-center hidden sm:flex">
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

                <div>
                    <ModeToggle />
                </div>

                {/* hamburger and airbnb logo */}
                <div className="flex gap-x-1 lg:gap-x-6 items-center">
                    <div
                        className="hover:cursor-pointer 
                        text-sm font-semibold py-3 transition px-4 rounded-full
                        hidden lg:block 
                        text-slate-600 
                        hover:bg-slate-300
                        active:bg-slate-400 
                        dark:text-slate-100 
                        dark:active:bg-slate-600
                        dark:hover:bg-slate-500"
                        onClick={handleModalOpen}
                    >
                        Airbnb Your Home
                    </div>

                    {/* hamburger menu */}
                    <div
                        className="flex gap-x-2 items-center border-[2px] rounded-full px-2 py-2 relative hover:cursor-pointer select-none hover:shadow-md hover:text-slate-700 text-slate-800 active:bg-slate-50 active:shadow-lg transition active:border-slate-400 dark:active:bg-slate-400"
                        onClick={handleDropDownToggle}
                        ref={dropDownToggleRef}
                    >
                        <GiHamburgerMenu className="hidden lg:block dark:text-slate-100" />
                        <Image
                            src={
                                currentUser?.image
                                    ? currentUser.image
                                    : "/images/placeholder.jpg"
                            }
                            width={30}
                            height={30}
                            alt="placeholder"
                            className="rounded-full shadow border border-gray-600 select-none"
                        />
                        {/* <ThemeSwitch /> */}
                        <Dropdown
                            currentUser={currentUser}
                            className="absolute top-12 -right-[1px] md:-right-10  hover:shadow-md"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;
