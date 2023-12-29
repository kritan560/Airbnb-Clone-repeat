"use client";

import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { FavoriteEnum } from "@/app/enumStore/userStateEnum";
import useCountries from "@/app/hooks/useCountries";
import LoginStore from "@/app/store/loginStore";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { FaRegHeart } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import Body from "../body/Body";
import Button from "../button/Button";
import Heading from "../heading/Heading";
import { categoryIcons } from "../modal/1categoriesModal/CategoryModal";
import DateRangeModal from "../modal/7_dateRangeModal/DateRangeModal";
import {
    EmojiToast,
    FAVORITE_ASSIGNED,
    FAVORITE_ASSIGNED_ICON,
    FAVORITE_REMOVED,
    FAVORITE_REMOVED_ICON,
    RESERVED_SUCCESS,
    SuccessToast,
    UNAUTHORIZED
} from "../toast/Toast";

type ListingDetailProps = {
    listing: Listing;
    currentUser: User;
    disableRanges: Date[];
    totalprice: number;
    totalDays: number;
    favorites: string[] | undefined;
};

const ListingDetail: React.FC<ListingDetailProps> = ({
    listing,
    currentUser,
    favorites,
    disableRanges,
    totalprice: TOTALPRICE,
    totalDays: TOTALDAYS
}) => {
    const router = useRouter();
    const countries = useCountries();
    const loginStore = LoginStore();
    const { theme, systemTheme } = useTheme();

    // when you load the content dynamically the change in some component would refresh the whole component causing the refresh of the component. to stop the refresh of the component remove the dynamic comonent and use the regular import of the component
    // const Body = dynamic(() => import("../body/Body"), { ssr: false });
    // const Heading = dynamic(() => import("../heading/Heading"), { ssr: false });

    // importing dynamic map with memo
    // used this because (maps often gets refresh when dates is changed)
    const Map = useMemo(
        () => dynamic(() => import("../modal/2mapModal/Map"), { ssr: false }),
        [loginStore.isOpen]
    );

    const [wating, setWating] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    // getting the listing icons
    const icon = categoryIcons.find(
        (item) => item.iconName == listing.category
    );

    if (!icon) return;
    const { icon: Icon, iconName } = icon;

    // getting the map position
    const position = countries.find((country) => country.value == listing.map);
    if (!position) return;

    // handle the heart click
    async function handleHeartClick(itemId: string) {
        const user = await getCurrentUser();
        if (!user) {
            loginStore.onOpen();
            SuccessToast(theme, systemTheme, UNAUTHORIZED);
        }

        // make the listing favorite to specific user
        axios
            .post("/api/favorite", { itemId })
            .then((res) => {
                router.refresh();
                if (res.data.code == FavoriteEnum.FAVORITE_ASSIGNED) {
                    // toast("favorited", { icon: "😊" });
                    EmojiToast(
                        theme,
                        systemTheme,
                        FAVORITE_ASSIGNED,
                        FAVORITE_ASSIGNED_ICON
                    );
                } else if (res.data.code == FavoriteEnum.FAVORITE_REMOVED) {
                    EmojiToast(
                        theme,
                        systemTheme,
                        FAVORITE_REMOVED,
                        FAVORITE_REMOVED_ICON
                    );
                }
            })
            .catch((err) => console.error("something went wrong"));
    }

    async function handleReserveClick(listingId: string, userId: string) {
        setWating(true);
        const currentLoggedInUser = await getCurrentUser();
        if (!currentLoggedInUser) {
            return loginStore.onOpen();
        }
        const currentLoggedInUserId = currentLoggedInUser?.id;
        const date = state[0];
        axios
            .post("/api/reservation", {
                listingId,
                currentLoggedInUserId,
                startDate: date?.startDate,
                endDate: date?.endDate,
                totalPrice: totalPrice,
                totalDays: totalDays
            })
            .then((res) => {
                setState([]);
                router.prefetch("/reservations");
                router.push("/reservations");
                router.refresh();
                setWating(false);
                SuccessToast(
                    theme,
                    systemTheme,
                    `${RESERVED_SUCCESS}${listing.map.slice(0, 14)}`
                );
            })
            .catch((err) => console.error("something went wrong"));
    }

    function handleChange({ selection }: RangeKeyDict) {
        const startDate = selection.startDate
            ? selection.startDate
            : new Date();
        const endDate = selection.endDate ? selection.endDate : new Date();
        setState([
            {
                startDate: startDate,
                endDate: endDate,
                key: selection.key as string
            }
        ]);
        const diff = differenceInCalendarDays(endDate, startDate) + 1;
        setTotalPrice(diff * listing.price);
        setTotalDays(diff);
    }

    return (
        <div>
            <Heading title={listing.map} subtitle={listing.description} />
            <Body>
                <div className="w-full h-96 relative">
                    <Image
                        src={listing.image}
                        fill
                        alt="listing detail image"
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                    />
                    <div
                        className="group/heart hover:cursor-pointer"
                        onClick={() => handleHeartClick(listing.id)}
                    >
                        <GoHeartFill
                            className={` absolute top-2 left-3
                                group-active/heart:scale-95 group-hover/heart:scale-[1.15] transition
                            ${
                                favorites?.some(
                                    (listItem) => listItem == listing.id
                                )
                                    ? "fill-red-600"
                                    : "fill-slate-500"
                            }`}
                            size={25}
                        />
                        <FaRegHeart
                            size={26}
                            className={
                                "fill-slate-200 absolute top-2 left-3 group-active/heart:scale-95 group-hover/heart:scale-[1.15] transition"
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center lg:flex-row gap-y-3 gap-x-9 py-8">
                    <div className="w-[95%] lg:w-[60%]">
                        <div className="flex flex-col gap-y-9">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-2 font-bold items-center text-lg">
                                    <p className="text-xl">Faciliated By</p>
                                    <div className="flex gap-x-2 items-center">
                                        <p className="">{currentUser.name}</p>
                                        <Image
                                            src={
                                                currentUser.image
                                                    ? currentUser.image
                                                    : "/images/placeholder.jpg"
                                            }
                                            width={30}
                                            height={30}
                                            alt="current user image"
                                            className="rounded-full"
                                            quality={50}
                                        />
                                    </div>
                                </div>

                                {/* amenities here */}
                                <div className="flex gap-x-3 font-light">
                                    <p>{listing.bedrooms} Bedrooms</p>
                                    <p>{listing.rooms} Rooms</p>
                                    <p>{listing.guests} Guests</p>
                                </div>
                            </div>

                            <hr />

                            {/* property on */}
                            <div className="flex gap-x-3 items-end">
                                <Icon
                                    size={55}
                                    className={
                                        "text-slate-700 dark:text-slate-200"
                                    }
                                />
                                <div>
                                    <h2 className="font-bold text-lg">
                                        {iconName}
                                    </h2>
                                    <p className="font-thin">
                                        This property is in the{" "}
                                        {listing.category}{" "}
                                    </p>
                                </div>
                            </div>
                            <hr />

                            {/* description */}
                            <div className="flex flex-col gap-y-3">
                                <h3 className="font-bold text-lg">
                                    Description
                                </h3>
                                <div className="font-thin">
                                    {listing.description}
                                </div>
                            </div>
                            <hr />

                            {/* maps */}
                            <div className="">
                                <Map position={position.latLng} />
                            </div>
                        </div>
                    </div>

                    {/* the calender to display */}
                    <div className="w-[95%] lg:w-[40%] md:flex flex-col gap-y-4 border-2 py-4 rounded-lg">
                        {/* per night */}
                        <p className="font-bold text-xl px-4">
                            ${listing.price}{" "}
                            <span className="font-light text-base">Night</span>
                        </p>
                        <hr />
                        <div className="p-0">
                            <DateRangeModal
                                handleChange={handleChange}
                                state={state}
                                disableDates={disableRanges}
                                theme={theme}
                                systemTheme={systemTheme}
                            />
                        </div>

                        {/* total Days*/}
                        <div className="flex justify-between mx-4 font-bold text-xl">
                            <p>Days</p>
                            <div>
                                <span>
                                    {totalDays + TOTALDAYS < 1
                                        ? 1
                                        : totalDays + TOTALDAYS}
                                </span>
                                <span className="ml-1">
                                    {totalDays + TOTALDAYS > 1 ? "Days" : "Day"}
                                </span>
                            </div>
                        </div>

                        {/* total cost */}
                        <div className="flex justify-between mx-4 font-bold text-xl">
                            <p>Total</p>
                            <p>${totalPrice + TOTALPRICE || listing.price}</p>
                        </div>

                        {/* reserve button */}
                        <Button
                            primaryAction={() => {
                                if (!wating)
                                    handleReserveClick(
                                        listing.id,
                                        currentUser.id
                                    );
                            }}
                            primaryLabel="Reserve"
                            class={{
                                bgPrimaryStyle: `mx-4 ${
                                    wating && "cursor-not-allowed"
                                }`
                            }}
                        />
                    </div>
                </div>
            </Body>
        </div>
    );
};

export default ListingDetail;
