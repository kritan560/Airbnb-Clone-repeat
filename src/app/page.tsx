import prisma from "../../prisma/PrismaDB";
import NoMatchFound from "./(components)/noMatchFound/NoMatchFound";
import Homepage from "./(pages)/homepage/Homepage";

type PageProps = {
    searchParams: { category: string };
};

async function getModalData(category: string) {
    let data;
    if (category !== "") {
        return (data = await prisma.listing.findMany({
            where: { category: category }
        }));
    }
    return (data = await prisma.listing.findMany());
}

const Page = async ({ searchParams }: PageProps) => {
    const listings = await getModalData(searchParams.category);
    return (
        <>
            {listings.length >= 0 && <Homepage listings={listings} />}
            {listings.length <= 0 && <NoMatchFound />}
        </>
    );
};
export default Page;
