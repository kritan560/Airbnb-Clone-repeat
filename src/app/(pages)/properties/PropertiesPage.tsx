"use client";

import Listing from "@/app/(components)/listing/Listing";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
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
    const deleteConfirmStore = DeleteConfirmStore();
    const modalStore = ModalStore();
    const router = useRouter();

    function handleButtonAction(id: string) {
        deleteConfirmStore.id = id;
        deleteConfirmStore.onOpen();
    }

    function handleNoMatchButtonAction() {
        // open the modalstore so you can add the properties
        modalStore.onOpen();
    }

    return (
        <>
            <Listing
                listings={listings}
                buttonNeeded={true}
                buttonLabel="Delete Property"
                buttonAction={handleButtonAction}
                favorites={favListings}
                title="My Properties"
                subtitle="This is the property You own!!!"
                noMatchFoundheadingLabel="Add Some Properties"
                noMatchFoundbuttonLabel="Add Property"
                noMatchFoundButtonAction={handleNoMatchButtonAction}
            />
        </>
    );
};

export default PropertiesPage;
