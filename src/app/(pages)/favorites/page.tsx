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
            <Heading
                title="Favorites"
                subtitle="List of favorite places you have selected"
            />
            <Listing listings={listings} favorites={favListing} />
        </div>
    );
};

export default Favorites;
