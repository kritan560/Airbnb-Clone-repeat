import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/navbar/Navbar";
import MainModal from "./(components)/modal/MainModal";
import FilterModal from "./(components)/modal/FilterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "./(components)/modal/LoginModal";
import SignupModal from "./(components)/modal/SignupModal";
import getCurrentUser from "./(actions)/getCurrentUser";
import { Providers } from "./provider";
import DeleteConfirmationModal from "./(components)/modal/DeleteConfirmationModal";
import { Suspense } from "react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
        icon: [
            {
                url: "/images/logo-crop.png"
            }
        ]
    }
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${nunito.className} bg-gray-700`}>
                <Providers>
                    <div className="rounded-lg bg-white fixed inset-0 overflow-y-auto scrollbar-thumb-red-600 scrollbar-thin scrollbar-thumb-rounded-full">
                        <Toaster />
                        <Navbar currentUser={currentUser} />
                        <MainModal />
                        <FilterModal />
                        <Suspense>
                            <LoginModal />
                            <SignupModal />
                        </Suspense>
                        <DeleteConfirmationModal />
                        <div className="px-24 py-6">{children}</div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
