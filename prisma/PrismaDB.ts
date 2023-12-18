import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prismaa: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaa ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaa = prisma;

