"use client";

import Listing from "@/app/(components)/listing/Listing";
import ModalStore from "@/app/store/modalStore";
import { Listing as ListingType } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type PropertiesPageProps = {
    listings: ListingType[];
    favListings: string[] | undefined;
};

const PropertiesPage: React.FC<PropertiesPageProps> = ({
    listings,
    favListings
}) => {
    const modalStore = ModalStore();
    const router = useRouter();
    function handleButtonAction() {
        modalStore.onOpen();
    }

    return (
        <>
            <Listing
                listings={listings}
                buttonNeeded={{ buttonlabel: "Delete Property" }}
                favorites={favListings}
                title="My Properties"
                subtitle="This is the property You own!!!"
                headingLabel="Add Some Properties"
                buttonLabel="Add Property"
                buttonAction={handleButtonAction}
            />
        </>
    );
};

export default PropertiesPage;
