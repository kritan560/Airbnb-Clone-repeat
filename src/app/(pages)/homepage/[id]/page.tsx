import prisma from "../../../../../prisma/PrismaDB";

type ParamsId = {
    params: { id: string };
};

const page = async ({ params }: ParamsId) => {
    const list = await prisma.listing.findUnique({
        where: { id: params.id }
    });
    return <div>{list?.category}</div>;
};
export default page;
