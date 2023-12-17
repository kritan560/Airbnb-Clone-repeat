import prisma from "../../prisma/PrismaDB";
import NoMatchFound from "./(components)/noMatchFound/NoMatchFound";
import Homepage from "./(pages)/homepage/Homepage";

type PageProps = {
    searchParams: { category: string };
};

async function getModalData(category: string) {
    let data;
    if (category !== "") {
        return (data = await prisma.modelData.findMany({
            where: { category: category }
        }));
    }
    return (data = await prisma.modelData.findMany());
}

const Page = async ({ searchParams }: PageProps) => {
    const modalsFromDB = await getModalData(searchParams.category);
    return (
        <>
            {modalsFromDB.length >= 0 && (
                <Homepage modalsFromDB={modalsFromDB} />
            )}
            {modalsFromDB.length <= 0 && <NoMatchFound />}
        </>
    );
};
export default Page;
