import { NextResponse } from "next/server";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";

export async function POST(request: Request, response: Response) {
    const { itemId } = await request.json();
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }

    // check if there already an existing favorite listing for particular id
    const isFavorite = await prisma.user.findFirst({
        where: {
            id: user.id,
            favoritesIds: { has: itemId }
        }
    });

    // removing that unique favorite if there are multiple favorite
    const newData = isFavorite?.favoritesIds.filter((id) => itemId !== id);

    // if there is a favorite remote it from list when clicked again
    if (isFavorite) {
        await prisma.user.update({
            where: { id: user.id },
            data: { favoritesIds: newData }
        });
        return NextResponse.json('remove when clicked again')
    }

    // assign the favorite listing
    const favorite = await prisma.user.update({
        where: {
            id: user.id
        },
        data: { favoritesIds: { push: itemId } }
    });

    return NextResponse.json("favorite response");
}
