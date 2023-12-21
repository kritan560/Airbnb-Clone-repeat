import React from "react";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import Listing from "@/app/(components)/listing/Listing";
import Heading from "@/app/(components)/heading/Heading";

const Properties = async () => {
    const user = await getCurrentUser();
    const listings = await prisma.listing.findMany({
        where: { userId: user?.id }
    });
    const favListing = user?.favoritesIds;

    return (
        <>
            <Heading title="Properties" subtitle="List of your Properties" />
            <Listing
                listings={listings}
                buttonNeeded={{ buttonlabel: "Delete Property" }}
                favorites={favListing}
            />
        </>
    );
};

export default Properties;
