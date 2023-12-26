"use client";

import React from "react";
import Button from "../button/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { FavoriteEnum } from "@/app/enumStore/userStateEnum";
import { useRouter } from "next/navigation";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import LoginStore from "@/app/store/loginStore";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { GoHeartFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { format } from "date-fns";

type ListingCardType = {
    endDay: Date;
    startDay: Date;
    totalDays: number;
    totalPrice: number;
    image: string;
    place: string;
    listingId: string;
    favorites: string[];
    reservationId: string;
};

const ListingCard: React.FC<ListingCardType> = ({
    endDay,
    startDay,
    totalDays,
    totalPrice,
    image,
    place,
    listingId,
    favorites,
    reservationId
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
            .catch((err) => console.error("something went wrong"));
    }

    function uniqueItem(listing: string) {
        router.push(`homepage/${listing}`);
    }

    function handleDeleteReservation(reservationId: string) {
        axios
            .delete(`/api/reservation/${reservationId}`)
            .then((res) => {
                // console.log(res);
                router.refresh();
                toast.success(`reservation of ${totalDays} cancelled`);
            })
            .catch((err) => console.error("something went wrong"));
    }

    return (
        <div>
            <div
                key={listingId}
                className="hover:cursor-pointer group flex flex-col gap-y-3"
            >
                <div className="overflow-hidden rounded-lg mb-1 relative">
                    <Image
                        src={image}
                        width={500}
                        height={500}
                        alt="image"
                        className={`w-full aspect-square transition group-hover:scale-110 group-active:scale-105`}
                        onClick={() => uniqueItem(listingId)}
                    />
                    <div
                        className="group/heart"
                        onClick={() => handleHeartClick(listingId)}
                    >
                        <GoHeartFill
                            className={` absolute top-2 left-3
                        group-active/heart:scale-95 group-hover/heart:scale-[1.15] transition
                    ${
                        favorites?.some((listItem) => listItem == listingId)
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
                    onClick={() => uniqueItem(listingId)}
                    className="flex flex-col gap-y-2"
                >
                    <div className="font-semibold">{place.slice(0, 21)}</div>
                    <div className="font-light flex gap-x-1 text-sm">
                        <span className="whitespace-nowrap">
                            {format(startDay, "MMM-dd-yyyy")}
                        </span>
                        <span>-</span>
                        <span className="whitespace-nowrap">
                            {format(endDay, "MMM-dd-yyyy")}
                        </span>
                    </div>
                    <div>
                        <span className="font-semibold">${totalPrice}</span>
                        <span className="font-light ml-2">
                            for{" "}
                            <span className="font-semibold mr-2">
                                {totalDays}
                            </span>
                            days
                        </span>
                    </div>
                </div>
                <Button
                    primaryLabel={"cancel reservation"}
                    primaryAction={() => handleDeleteReservation(reservationId)}
                    btnSm={true}
                    textSize="thin"
                />
            </div>
        </div>
    );
};

export default ListingCard;
