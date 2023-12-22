import React, { Suspense } from "react";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import Listing from "@/app/(components)/listing/Listing";
import Heading from "@/app/(components)/heading/Heading";
import PropertiesPage from "./PropertiesPage";

const Properties = async () => {
    const user = await getCurrentUser();
    const listings = await prisma.listing.findMany({
        where: { userId: user?.id }
    });
    const favListings = user?.favoritesIds;

    return (
        <>
            <Suspense fallback={<>loading...</>}>
                <PropertiesPage listings={listings} favListings={favListings} />
            </Suspense>
        </>
    );
};

export default Properties;
