"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../prisma/PrismaDB";

export async function getSessionStatus() {
    return await getServerSession();
}

export default async function getCurrentUser() {
    try {
        const session = await getSessionStatus();
        
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            // createdAt: currentUser.updatedAt.toISOString(),
            // updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch (error) {
        return null;
    }
}

