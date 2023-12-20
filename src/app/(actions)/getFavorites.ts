import prisma from "../../../prisma/PrismaDB";
import getCurrentUser from "./getCurrentUser";

export async function getFavorites() {
    const user = await getCurrentUser();
    if (!user) return [];

    return await prisma.listing.findMany({
        where: { id: { in: user.favoritesIds } }
    });
}
