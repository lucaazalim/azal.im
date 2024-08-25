import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {ImageViewContextProvider} from "@/app/components/image-view/ImageViewContext";
import ImageView from "@/app/components/image-view/ImageView";

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
        <ImageViewContextProvider>
            <ImageView/>
            {children}
        </ImageViewContextProvider>
        </body>
        </html>
    );
}
