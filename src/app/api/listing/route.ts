import { NextResponse } from "next/server";
import { CategoryIcon } from "@/app/(components)/modal/1categoriesModal/CategoryModal";
import { CountryType } from "@/app/(components)/modal/2mapModal/MapModal";
import prisma from "../../../../prisma/PrismaDB";
import getCurrentUser from "@/app/(actions)/getCurrentUser";

type RequestType = {
    category: CategoryIcon;
    map: CountryType;
    [key: string]: any;
};

export async function POST(request: Request, response: Response) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.error();
    }
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
    const listings = await prisma.listing.create({
        data: {
            bedrooms: bedrooms,
            category: category.iconName,
            description: description,
            guests: guests,
            image: image,
            map: map.value,
            price: price,
            rooms: rooms,
            title: title,
            userId: user.id
        }
    });
    return NextResponse.json(listings);
}
