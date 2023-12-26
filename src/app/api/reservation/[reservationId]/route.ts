import getCurrentUser from "@/app/(actions)/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";

type ParamsType = {
    params: { reservationId: string };
};

export async function DELETE(request: Request, { params }: ParamsType) {
    const reservation = await prisma.reservation.delete({
        where: {
            id: params.reservationId,
        }
    });

    console.log(params.reservationId);
    console.log(reservation);

    return NextResponse.json("reservation deleted");
}
