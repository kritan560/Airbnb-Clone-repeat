import { NextResponse } from "next/server";
import { CategoryIcon } from "@/app/(components)/modal/1categoriesModal/CategoryModal";
import { CountryType } from "@/app/(components)/modal/2mapModal/MapModal";
import prisma from "../../../../prisma/PrismaDB";

type RequestType = {
    category: CategoryIcon;
    map: CountryType;
    [key: string]: any;
};

export async function POST(request: Request, response: Response) {
    const {
        guests,
        rooms,
        bedrooms,
        title,
        description,
        price,
        category,
        map,
        image
    } = (await request.json()) as RequestType;
    const modalData = await prisma.modelData.create({
        data: {
            bedrooms: bedrooms,
            category: category.iconName,
            description: description,
            guests: guests,
            image: image,
            map: map.value,
            price: price,
            rooms: rooms,
            title: title
        }
    });
    return NextResponse.json(modalData);
}
