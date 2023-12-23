"use client";

import { Listing, User } from "@prisma/client";
import Image from "next/image";
import React, { useMemo } from "react";
import Heading from "../heading/Heading";
import Body from "../body/Body";
import DateRangeModal from "../modal/7_dateRangeModal/DateRangeModal";
import { categoryIcons } from "../modal/1categoriesModal/CategoryModal";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import { GoHeartFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FavoriteEnum } from "@/app/enumStore/userStateEnum";
import toast from "react-hot-toast";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import LoginStore from "@/app/store/loginStore";
import { useForm } from "react-hook-form";
import Button from "../button/Button";

type ListingDetailProps = {
    listing: Listing;
    currentUser: User;
    favorites?: string[] | undefined;
};

const ListingDetail: React.FC<ListingDetailProps> = ({
    listing,
    currentUser,
    favorites
}) => {
    const router = useRouter();
    const countries = useCountries();
    const loginStore = LoginStore();
    const { watch, setValue } = useForm();
    const DateRangeModal = dynamic(
        () => import("../modal/7_dateRangeModal/DateRangeModal"),
        { ssr: false }
    );
    const Body = dynamic(() => import("../body/Body"), { ssr: false });
    const Heading = dynamic(() => import("../heading/Heading"), { ssr: false });

    // importing dynamic map with memo
    // used this because (maps often gets refresh when dates is changed)
    const Map = useMemo(
        () => dynamic(() => import("../modal/2mapModal/Map"), { ssr: false }),
        []
    );

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
            toast.error("Opps! Please login");
            // router.push(`?detail=${pathName}`)
            return loginStore.onOpen();
        }

        // make the listing favorite to specific user
        axios
            .post("/api/favorite", { itemId })
            .then((res) => {
                router.refresh();
                if (res.data.code == FavoriteEnum.FAVORITE_ASSIGNED) {
                    toast("favorited", { icon: "😊" });
                } else if (res.data.code == FavoriteEnum.FAVORITE_REMOVED) {
                    toast("favorite removed", { icon: "😔" });
                }
            })
            .catch((err) => console.error(err));
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
                        // objectFit="cover"
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                        quality={20}
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
                <div className="flex gap-x-9 py-8">
                    <div className="w-[60%]">
                        <div className="flex flex-col gap-y-9">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-2 font-bold items-center text-lg">
                                    <p className="text-xl">Created By</p>
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
                                <Icon size={55} className={"text-slate-700"} />
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
                            <div>
                                <Map position={position.latLng} />
                            </div>
                        </div>
                    </div>

                    {/* the calender to display */}
                    <div className="w-[40%] flex flex-col gap-y-4 border-2 py-4 rounded-lg">
                        {/* pernight */}
                        <p className="font-bold text-xl px-4">
                            ${listing.price}{" "}
                            <span className="font-light text-base">Night</span>
                        </p>
                        <hr />
                        <div className="p-0">
                            <DateRangeModal setValue={setValue} watch={watch} />
                        </div>
                        {/* reserve button */}
                        <Button
                            primaryAction={() => {}}
                            primaryLabel="Reserve"
                            class={{ bgPrimaryStyle: "mx-4" }}
                        />
                        {/* total cost */}
                        <div className="flex justify-between mx-4 mt-8 font-bold text-xl">
                            <p>Total</p>
                            <p>$12323</p>
                        </div>
                    </div>
                </div>
            </Body>
        </div>
    );
};

export default ListingDetail;
