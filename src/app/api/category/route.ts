import { NextResponse } from "next/server";
import prisma from "../../../../prisma/PrismaDB";

export async function POST(request: Request, response: Response) {
    const { category } = await request.json();
    const categories = await prisma.modelData.findMany({
        where: {
            category: category
        }
    });
    console.log(categories);
    return NextResponse.json(categories);
}
