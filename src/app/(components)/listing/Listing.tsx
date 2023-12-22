"use client";

import { Listing as ListingType } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { GoHeartFill } from "react-icons/go";
import Button from "../button/Button";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { FavoriteEnum } from "@/app/enumStore/userStateEnum";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import LoginStore from "@/app/store/loginStore";
import Heading from "../heading/Heading";
import NoMatchFound from "../noMatchFound/NoMatchFound";
import Body from "../body/Body";

type ListingProps = {
    listings: ListingType[];
    buttonNeeded?: { buttonlabel: string };
    favorites?: string[] | undefined;
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    headingLabel?: string;
    buttonAction?: () => void;
};

const Listing: React.FC<ListingProps> = ({
    listings,
    buttonNeeded,
    favorites,
    subtitle = "",
    title = "",
    buttonLabel = "Goto Homepage",
    headingLabel = "Visit the homepage to view listings",
    buttonAction
}) => {
    const router = useRouter();
    const deleteConfirmStore = DeleteConfirmStore();
    const loginStore = LoginStore();

    async function handleHeartClick(itemId: string) {
        const user = await getCurrentUser();
        if (!user) {
            toast.error("opps! Please login");
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

    function uniqueItem(listing: string) {
        router.push(`homepage/${listing}`);
    }

    const primaryAction = (id: string) => {
        deleteConfirmStore.id = id;
        deleteConfirmStore.onOpen();
    };

    const primaryLabel = buttonNeeded ? buttonNeeded.buttonlabel : "";

    let bodyContent;

    if (listings.length <= 0) {
        return (bodyContent = (
            <div className="">
                {listings.length <= 0 && (
                    <div className="mt-10">
                        <NoMatchFound
                            buttonLabel={buttonLabel}
                            headingLabel={headingLabel}
                            buttonAction={buttonAction}
                        />
                    </div>
                )}
            </div>
        ));
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
                                    {listing.map}
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
                                    primaryLabel={primaryLabel}
                                    primaryAction={() =>
                                        primaryAction(listing.id)
                                    }
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
