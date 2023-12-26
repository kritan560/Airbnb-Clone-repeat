import getCurrentUser from "@/app/(actions)/getCurrentUser";
import Listing from "@/app/(components)/listing/Listing";
import ScrollBar from "@/app/(components)/scrollBar/ScrollBar";
import { Listing as ListingType } from "@prisma/client";

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
            <Listing
                listings={listings}
                favorites={favListing}
                // nomatchfoundbuttonAction is performed automatically via removeFilter function inside NoMatchFound component
                noMatchFoundbuttonLabel="Homepage"
                noMatchFoundheadingLabel="Visit homepage to view other categories"
            />
        </>
    );
}
