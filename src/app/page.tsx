import prisma from "@/prisma/PrismaDB";
import Homepage from "./Homepage";

const Page = async () => {
    const modalsFromDB = await prisma.modelData.findMany();
    
    return (
        <>
            <Homepage modalsFromDB={modalsFromDB} />
        </>
    );
};
export default Page;
