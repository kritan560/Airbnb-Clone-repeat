import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { getFavorites } from "@/app/(actions)/getFavorites";
import Listing from "@/app/(components)/listing/Listing";

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
                noMatchFoundheadingLabel="Add Some Hearts"
                subtitle="Some of the favorites place you have selected!!!"
            />
        </div>
    );
};

export default Favorites;
