import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/PrismaDB";
import { compare } from "bcrypt";
import { UserState } from "@/app/enumStore/userStateEnum";

export async function POST(request: Request, response: Response) {
    const { email, password } = await request.json();

    // check if user exists in DB
    const isUser = await prisma.user.findUnique({ where: { email: email } });
    if (!isUser) {
        return NextResponse.json({
            message: "User does not exist in DB",
            code : UserState.USER_NOT_EXISTS
        });
    }

    // if email exist compare the password
    const plainPassword = isUser.hashedPassword;
    if (!plainPassword) {
        return NextResponse.json({
            message: "provide the password",
            code : UserState.PASSWORD_NOT_FOUND
        });
    }
    const isCheckedPassword = await compare(password, plainPassword);

    // if match return user
    if (!isCheckedPassword) {
        return NextResponse.json({
            message: "password do not match",
            code : UserState.PASSWORD_NOT_MATCH
        });
    }

    const user = isUser;

    return NextResponse.json({
        message: "login Success",
        code : UserState.LOGIN_SUCCESS
    });
}
