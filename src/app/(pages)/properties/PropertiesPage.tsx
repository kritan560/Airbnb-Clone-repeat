"use client";

import Listing from "@/app/(components)/listing/Listing";
import DeleteConfirmationModal from "@/app/(components)/modal/DeleteConfirmationModal";
import NoMatchFound from "@/app/(components)/noMatchFound/NoMatchFound";
import DeleteConfirmStore from "@/app/store/deleteConfirmStore";
import ModalStore from "@/app/store/modalStore";
import { Listing as ListingType } from "@prisma/client";
import axios from "axios";
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

    function handlePropertyDelete() {
        axios
            .delete(`/api/listing/${deleteConfirmStore.id}`)
            .then((res) => {
                console.log(res);
                router.refresh();
                deleteConfirmStore.onClose();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function NoProperties() {
        if (listings.length <= 0) {
            return (
                <NoMatchFound
                    buttonLabel="Add Property"
                    headingLabel="I Can't see any properties here!!!"
                    buttonAction={handleNoMatchButtonAction}
                />
            );
        }
    }

    return (
        <>
            <DeleteConfirmationModal
                buttonPrimaryAction={() => handlePropertyDelete()}
                buttonPrimaryLabel="Delete"
                title="Delete Property"
                subtitle="Are you sure you want to Delete Property?"
            />
            {NoProperties()}
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
