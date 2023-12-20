"use client";

import { Listing as ListingType } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { GoHeartFill } from "react-icons/go";
import Button from "../button/Button";

type ListingProps = {
    listings: ListingType[];
    buttonNeeded?: { buttonlabel: string };
    favorites?: string[] | undefined;
};

const Listing: React.FC<ListingProps> = ({
    listings,
    buttonNeeded,
    favorites
}) => {
    const router = useRouter();

    function handleHeartClick(itemId: string) {
        axios
            .post("/api/favorite", { itemId })
            .then((res) => {
                router.refresh();
            })
            .catch((err) => console.error(err));
    }

    function uniqueItem(item: string) {
        router.push(`homepage/${item}`);
    }

    const primaryAction = () => {};
    const primaryLabel = buttonNeeded ? buttonNeeded.buttonlabel : "";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-6 mt-12">
            {listings.map((item) => (
                <div key={item.id} className="hover:cursor-pointer group">
                    <div className="overflow-hidden rounded-lg mb-1 relative">
                        <Image
                            src={item.image}
                            width={500}
                            height={500}
                            alt="image"
                            className={`w-full aspect-square transition group-hover:scale-110 group-active:scale-105`}
                            onClick={() => uniqueItem(item.id)}
                        />
                        <GoHeartFill
                            onClick={() => handleHeartClick(item.id)}
                            // heart logo should be red when favorited.
                            className={`absolute top-2 left-3 
                            ${
                                favorites?.some(
                                    (listItem) => listItem == item.id
                                )
                                    ? "fill-red-600"
                                    : "fill-slate-500"
                            }
                             active:scale-95 hover:scale-[1.15]`}
                            size={25}
                        />
                    </div>
                    <div onClick={() => uniqueItem(item.id)} className="">
                        <div className="font-semibold">{item.map}</div>
                        <div className="font-light">{item.category}</div>
                        <div>
                            <span className="font-semibold">${item.price}</span>
                            <span className="font-light ml-2">per Night</span>
                        </div>
                    </div>
                    {buttonNeeded && (
                        <Button
                            primaryLabel={primaryLabel}
                            primaryAction={primaryAction}
                            btnSm={true}
                            textSize="thin"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Listing;
