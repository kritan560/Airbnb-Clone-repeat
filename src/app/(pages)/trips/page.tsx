import React from "react";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import Listing from "@/app/(components)/listing/Listing";
import Heading from "@/app/(components)/heading/Heading";

const Trips = async () => {
    const user = await getCurrentUser();
    const listings = await prisma.listing.findMany({
        where: { userId: user?.id }
    });
    const favListing = user?.favoritesIds;

    return (
        <>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going
        "
            />
            <Listing
                listings={listings}
                buttonNeeded={{ buttonlabel: "Cancel reservations" }}
                favorites={favListing}
            />
        </>
    );
};

export default Trips;
