import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";
import { ListingEnum } from "@/app/enumStore/userStateEnum";

type ParamsType = {
    listingId: string;
};

export async function DELETE(
    request: Request,
    { params }: { params: ParamsType }
) {
    const user = await getCurrentUser();
    if (!user) {
        return null;
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
