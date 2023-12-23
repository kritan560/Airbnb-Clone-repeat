import React from "react";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import PropertiesPage from "./PropertiesPage";

const Properties = async () => {
    const user = await getCurrentUser();
    const listings = await prisma.listing.findMany({
        where: { userId: user?.id }
    });
    const favListings = user?.favoritesIds;

    return (
        <>
            <PropertiesPage listings={listings} favListings={favListings} />
        </>
    );
};

export default Properties;
