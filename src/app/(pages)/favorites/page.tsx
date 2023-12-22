import Heading from "@/app/(components)/heading/Heading";
import React from "react";
import Listing from "@/app/(components)/listing/Listing";
import { getFavorites } from "@/app/(actions)/getFavorites";
import getCurrentUser from "@/app/(actions)/getCurrentUser";

const Favorites = async () => {
    const listings = await getFavorites();
    const user = await getCurrentUser();
    const favListing = user?.favoritesIds;

    return (
        <div>
            <Listing
                listings={listings}
                favorites={favListing}
                title="Favorites"
                headingLabel="Add Some Hearts"
                subtitle="Some of the favorites place you have selected!!!"
            />
        </div>
    );
};

export default Favorites;
