import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./(actions)/getCurrentUser";
import FilterModal from "./(components)/modal/FilterModal";
import LoginModal from "./(components)/modal/LoginModal";
import MainModal from "./(components)/modal/MainModal";
import SignupModal from "./(components)/modal/SignupModal";
import Navbar from "./(components)/navbar/Navbar";
import { ThemeProvider } from "./(components)/theme/ThemeProvider";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Airbnb Clone",
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
            <body className={`${nunito.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div>
                        <div className="rounded-xl bg-white select-none w-full dark:bg-slate-900 dark:text-slate-100">
                            <Navbar currentUser={currentUser} />
                            <Toaster />
                            <MainModal />
                            <FilterModal />
                            <Suspense>
                                <LoginModal />
                                <SignupModal />
                            </Suspense>
                            <div className=" px-3 md:px-14 lg:px-24 py-6">
                                {children}
                            </div>
                        </div>
                    </div>{" "}
                </ThemeProvider>
            </body>
        </html>
    );
}
