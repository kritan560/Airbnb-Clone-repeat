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

    return NextResponse.json("reservation deleted");
}
