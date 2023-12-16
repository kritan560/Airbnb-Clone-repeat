import prisma from "../../../../../prisma/PrismaDB";

type ParamsId = {
    params: { id: string };
};

const page = async ({ params }: ParamsId) => {
    console.log(params);
    const list = await prisma.modelData.findUnique({
        where: { id: params.id }
    });
    console.log(list);
    return <div>{list?.category}</div>;
};
export default page;
