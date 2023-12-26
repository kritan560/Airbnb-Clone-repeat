import React from "react";
import prisma from "../../../../prisma/PrismaDB";
import ListingCard from "@/app/(components)/listing/ListingCard";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import NoMatchFound from "@/app/(components)/noMatchFound/NoMatchFound";

type ReservationPageType = {
    listingId: string;
    startDay: Date;
    endDay: Date;
    totalPrice: number;
    totalDays: number;
    reservationId: string;
};

const ReservationPage: React.FC<ReservationPageType> = async ({
    endDay,
    listingId,
    startDay,
    totalDays,
    totalPrice,
    reservationId
}) => {
    const listing = await prisma.listing.findUnique({
        where: { id: listingId }
    });
    
    const currentLoggedInUser = await getCurrentUser();

    if (!listing || !currentLoggedInUser) return;

    return (
        <div>
            <ListingCard
                endDay={endDay}
                image={listing.image}
                place={listing.map}
                startDay={startDay}
                totalDays={totalDays}
                totalPrice={totalPrice}
                listingId={listing.id}
                favorites={currentLoggedInUser.favoritesIds}
                reservationId={reservationId}
            />
        </div>
    );
};

export default ReservationPage;
