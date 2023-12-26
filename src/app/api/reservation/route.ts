import { NextResponse } from "next/server";
import prisma from "../../../../prisma/PrismaDB";

export async function POST(request: Request, response: Response) {
    const {
        listingId,
        currentLoggedInUserId,
        startDate,
        endDate,
        totalPrice,
        totalDays
    } = await request.json();

    // if reservation is already made and user want to add the reservation then update it
    // make sure the start and end date is not in reserved list
    // if less then reserved date update startdate if more update enddate

    // if reservation is already made do not create new reservation.
    // check if the current loggedin user already made reservation.
    const previousReservation = await prisma.reservation.findFirst({
        where: { listingId: listingId, userId: currentLoggedInUserId }
    });
    // if (previousReservation) {
    //     // // start date is smaller then reserved start date
    //     // if (
    //     //     isBefore(
    //     //         new Date(startDate),
    //     //         new Date(previousReservation.startDate)
    //     //     )
    //     // ) {
    //     //     console.log("Before runs");
    //     //     await prisma.reservation.updateMany({
    //     //         where: { listingId: listingId, userId: currentLoggedInUserId },
    //     //         data: {
    //     //             startDate: startDate,
    //     //             totalDays: totalDays,
    //     //             totalPrice: totalPrice
    //     //         }
    //     //     });
    //     //     return NextResponse.json("before run");
    //     // }

    //     // // start date is greater than reserved end date
    //     // else if (
    //     //     isAfter(new Date(startDate), new Date(previousReservation.endDate))
    //     // ) {
    //     //     console.log("After runs");
    //     //     await prisma.reservation.updateMany({
    //     //         where: { listingId: listingId, userId: currentLoggedInUserId },
    //     //         data: {
    //     //             endDate: endDate,
    //     //             totalDays: totalDays,
    //     //             totalPrice: totalPrice
    //     //         }
    //     //     });
    //     //     return NextResponse.json("after run");
    //     // }
    //     return;
    // }

    const reservation = await prisma.reservation.create({
        data: {
            userId: currentLoggedInUserId,
            listingId: listingId,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice,
            totalDays: totalDays
        }
    });

    return NextResponse.json("reservation post request return");
}
