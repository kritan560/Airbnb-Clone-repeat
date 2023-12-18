import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";
import { compare } from "bcrypt";

export async function POST(request: Request, response: Response) {
    const { email, password } = await request.json();

    // check if user exists in DB
    const isUser = await prisma.user.findUnique({ where: { email: email } });
    if (!isUser) {
        return NextResponse.json({
            message: "User does not exist in DB",
            foundUser: false,
            passwordMatch: false
        });
    }

    // if email exist compare the password
    const plainPassword = isUser.hashedPassword;
    if (!plainPassword) {
        return NextResponse.json({
            message: "provide the password",
            foundUser: true,
            passwordMatch: false
        });
    }
    const isCheckedPassword = await compare(password, plainPassword);

    // if match return user
    if (!isCheckedPassword) {
        return NextResponse.json({
            message: "password do not match",
            foundUser: true,
            passwordMatch: false
        });
    }

    const user = isUser;

    return NextResponse.json({
        foundUser: true,
        passwordMatch: true,
        message: "login Success"
    });
}
