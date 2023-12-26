import prisma from "../../prisma/PrismaDB";
import NoMatchFound from "./(components)/noMatchFound/NoMatchFound";
import Homepage from "./(pages)/homepage/Homepage";

async function getModalData(
    category: string,
    days: string,
    guest: string,
    location: string
) {
    if (category || guest || location) {
        return await prisma.listing.findMany({
            where: {
                OR: [
                    {
                        guests: Number(guest ? guest : 1),
                        map: location,
                        category: category
                    }
                ]
            }
        });
    }
    return await prisma.listing.findMany();
}

type PageProps = {
    searchParams: {
        category: string;
        days: string;
        location: string;
        guest: string;
    };
};

const Page = async ({ searchParams }: PageProps) => {
    const listings = await getModalData(
        searchParams.category,
        searchParams.days,
        searchParams.guest,
        searchParams.location
    );

    function ListingNotFound() {
        if (listings.length <= 0) {
            return (
                <NoMatchFound
                    buttonLabel="Visit Homepage"
                    headingLabel="Opps didn't find your categories Try changing categories"
                />
            );
        }
        return null;
    }

    return (
        <>
            {<Homepage listings={listings} />}
            <div className="mt-4">{ListingNotFound()}</div>
        </>
    );
};
export default Page;
