import { NextResponse } from "next/server";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { FavoriteEnum, UserState } from "@/app/enumStore/userStateEnum";

export async function POST(request: Request, response: Response) {
    const { itemId } = await request.json();
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ code: UserState.USER_NOT_EXISTS });
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
        return NextResponse.json({ code: FavoriteEnum.FAVORITE_REMOVED });
    }

    // assign the favorite listing
    const favorite = await prisma.user.update({
        where: {
            id: user.id
        },
        data: { favoritesIds: { push: itemId } }
    });

    return NextResponse.json({ code: FavoriteEnum.FAVORITE_ASSIGNED });
}
