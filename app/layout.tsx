import ImageView from "@/app/_components/image-view/ImageView";
import { ImageViewContextProvider } from "@/app/_components/image-view/ImageViewContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html
      lang="en"
      className="scroll-smooth selection:bg-accent/30 selection:text-accent"
    >
      <body className={`${inter.className} bg-background`}>
        <ImageViewContextProvider>
          <ImageView />
          {children}
        </ImageViewContextProvider>
      </body>
    </html>
  );
}
