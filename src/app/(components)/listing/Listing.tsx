"use client";

import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { FavoriteEnum } from "@/app/enumStore/userStateEnum";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import LoginStore from "@/app/store/loginStore";
import { Listing as ListingType } from "@prisma/client";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import Button from "../button/Button";
import Heading from "../heading/Heading";
import { EmojiToast, ErrorToast } from "../toast/Toast";

type ListingProps = {
    listings: ListingType[];
    buttonNeeded?: boolean;
    buttonLabel?: string;
    buttonAction?: (id: string) => void;
    favorites?: string[] | undefined;
    title?: string;
    subtitle?: string;
    noMatchFoundbuttonLabel?: string;
    noMatchFoundheadingLabel?: string;
    noMatchFoundButtonAction?: () => void;
};

const Listing: React.FC<ListingProps> = ({
    listings,
    buttonNeeded,
    favorites,
    subtitle = "",
    title = "",
    buttonAction = () => {},
    buttonLabel
}) => {
    const router = useRouter();
    const deleteConfirmStore = DeleteConfirmStore();
    const loginStore = LoginStore();
    const { systemTheme, theme } = useTheme();

    async function handleHeartClick(itemId: string) {
        const user = await getCurrentUser();
        if (!user) {
            loginStore.onOpen();
            ErrorToast(theme, systemTheme, "Opps! please Login");
        }

        // make the listing favorite to specific user
        axios
            .post("/api/favorite", { itemId })
            .then((res) => {
                router.refresh();
                if (res.data.code == FavoriteEnum.FAVORITE_ASSIGNED) {
                    // toast("favorited", { icon: "😊" });
                    EmojiToast(theme, systemTheme, "Favorited", "😍");
                } else if (res.data.code == FavoriteEnum.FAVORITE_REMOVED) {
                    // toast("favorite removed", { icon: "😔" });
                    EmojiToast(theme, systemTheme, "Favorite Removed", "😢");
                }
            })
            .catch((err) => console.error("something went wrong"));
    }

    function uniqueItem(listing: string) {
        router.push(`homepage/${listing}`);
    }

    const primaryAction = (id: string) => {
        deleteConfirmStore.id = id;
        deleteConfirmStore.onOpen();
    };

    let bodyContent;

    if (listings.length <= 0) {
        return (bodyContent = <div className=""></div>);
    } else
        bodyContent = (
            <>
                <Heading title={title} subtitle={subtitle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-6 mt-12">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="hover:cursor-pointer group"
                        >
                            <div className="overflow-hidden rounded-lg mb-1 relative">
                                <Image
                                    src={listing.image}
                                    width={500}
                                    height={500}
                                    alt="image"
                                    className={`w-full aspect-square transition group-hover:scale-110 group-active:scale-105`}
                                    onClick={() => uniqueItem(listing.id)}
                                />
                                <div
                                    className="group/heart"
                                    onClick={() => handleHeartClick(listing.id)}
                                >
                                    <GoHeartFill
                                        className={` absolute top-2 left-3
                        group-active/heart:scale-95 group-hover/heart:scale-[1.15] transition
                    ${
                        favorites?.some((listItem) => listItem == listing.id)
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
                            <div
                                onClick={() => uniqueItem(listing.id)}
                                className=""
                            >
                                <div className="font-semibold">
                                    {listing.map.slice(0, 25)}
                                </div>
                                <div className="font-light">
                                    {listing.category}
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        ${listing.price}
                                    </span>
                                    <span className="font-light ml-2">
                                        per Night
                                    </span>
                                </div>
                            </div>
                            {buttonNeeded && (
                                <Button
                                    primaryLabel={
                                        buttonLabel || "give me a Name"
                                    }
                                    primaryAction={() => {
                                        buttonAction(listing.id);
                                    }}
                                    btnSm={true}
                                    textSize="thin"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </>
        );

    return bodyContent;
};

export default Listing;
