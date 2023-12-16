import prisma from "../../prisma/PrismaDB";
import Homepage from "./(components)/homepage/Homepage";

const Page = async () => {
    const modalsFromDB = await prisma.modelData.findMany();

    return (
        <>
            <Homepage modalsFromDB={modalsFromDB} />
        </>
    );
};
export default Page;
