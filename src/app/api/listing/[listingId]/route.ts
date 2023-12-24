import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { ListingEnum, UserState } from "@/app/enumStore/userStateEnum";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";

type ParamsType = {
    listingId: string;
};

export async function DELETE(
    request: Request,
    { params }: { params: ParamsType }
) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ code: UserState.USER_NOT_EXISTS });
    }
    const userId = user.id;
    const listingId = params.listingId;
    const deletedListing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: userId
        }
    });
    return NextResponse.json({ code: ListingEnum.LISTING_REMOVED });
}
