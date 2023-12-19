import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";
import { hash } from "bcrypt";
import { UserState } from "@/app/enumStore/userStateEnum";

export async function POST(request: Request, response: Response) {
    const { email, name, password } = await request.json();
    const hashedPassword = await hash(password, 12);

    // check if email exists in DB
    const emailExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!emailExists?.email && !emailExists) {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                hashedPassword: hashedPassword
            }
        });
    } else if (emailExists.email) {
        return NextResponse.json({
            message: "User Already Exists in DB",
            code: UserState.USER_ALREADY_EXISTS
        });
    }
    return NextResponse.json({
        message: "New user signUp success",
        code: UserState.NEW_USER_CREATED
    });
}
