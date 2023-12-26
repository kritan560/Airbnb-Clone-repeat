import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { getFavorites } from "@/app/(actions)/getFavorites";
import Listing from "@/app/(components)/listing/Listing";
import NoMatchFound from "@/app/(components)/noMatchFound/NoMatchFound";

const Favorites = async () => {
    const listings = await getFavorites();
    const user = await getCurrentUser();
    const favListing = user?.favoritesIds;

    function NoListings() {
        if (listings.length <= 0) {
            return (
                <NoMatchFound
                    buttonLabel="Visit Homepage"
                    headingLabel="opps! i can't see any Favorites here"
                />
            );
        }
    }

    return (
        <div>
            {NoListings()}
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
