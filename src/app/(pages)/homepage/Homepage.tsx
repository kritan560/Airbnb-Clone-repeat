import { Listing as ListingType } from "@prisma/client";
import Listing from "@/app/(components)/listing/Listing";
import ScrollBar from "@/app/(components)/scrollBar/ScrollBar";
import getCurrentUser from "@/app/(actions)/getCurrentUser";

type HomepageProps = {
    listings: ListingType[];
};

export default async function Homepage({ listings }: HomepageProps) {
    const user = await getCurrentUser();
    const favListing = user?.favoritesIds;

    return (
        <>
            {/* scroll bar */}
            <ScrollBar />

            {/* listings items */}
            <Listing listings={listings} favorites={favListing} />
        </>
    );
}
