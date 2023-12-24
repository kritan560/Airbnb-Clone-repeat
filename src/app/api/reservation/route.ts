import { } from "date-fns";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/PrismaDB";

export async function POST(request: Request, response: Response) {
    const { listingId, currentLoggedInUserId, startDate, endDate, totalPrice } =
        await request.json();

    const reservation = await prisma.reservation.create({
        data: {
            userId: currentLoggedInUserId,
            listingId: listingId,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice
        }
    });

    return NextResponse.json("reservation post request return");
}

