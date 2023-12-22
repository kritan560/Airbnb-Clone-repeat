import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "../../../../../prisma/PrismaDB";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        Credentials({
            name: "Credentilas",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("invalid credentials no email password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("invalid credentials");
                }

                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("invalid credentials password not match");
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV !== "production",
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/login" },
    // callbacks: {
    //     async redirect({ url, baseUrl }) {
    //         console.log(url, 'url...')
    //         console.log(baseUrl, 'baseUrl...')
    //         // Allows relative callback URLs
    //         if (url.startsWith("/")) return `${baseUrl}${url}`;
    //         // Allows callback URLs on the same origin
    //         else if (new URL(url).origin === baseUrl) return url;
    //         console.log(localStorage.getItem('detail'),'!!!!!!!!!!')
    //         return baseUrl;
    //     }
    // }
});

export { handler as GET, handler as POST };
