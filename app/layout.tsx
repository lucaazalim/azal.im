import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Luca Azalim",
    description: "Software Engineer",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth selection:bg-accent/30">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
