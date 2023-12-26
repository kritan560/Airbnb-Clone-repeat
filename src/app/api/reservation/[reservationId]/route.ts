import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";

type ParamsType = {
    params: { reservationId: string };
};

export async function DELETE(request: Request, { params }: ParamsType) {
    // delete those reservation whose listing id is listingId
    const currentLoggedInUser = await getCurrentUser();

    const reservation = await prisma.reservation.deleteMany({
        where: {
            listingId: params.reservationId,
            userId: currentLoggedInUser?.id
        }
    });
    console.log(params.reservationId);
    console.log(reservation);
    return NextResponse.json("hello");
}
