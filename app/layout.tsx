import ImageView from "@/app/(home)/_components/image-view/ImageView";
import { ImageViewContextProvider } from "@/app/(home)/_components/image-view/ImageViewContext";
import TanStackQueryProvider from "@/components/TanStackQueryProvider";
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
      className="dark scroll-smooth selection:bg-accent/30 selection:text-accent"
      style={{
        scrollbarGutter: "stable",
      }}
    >
      <body className={`${inter.className} bg-background`}>
        <TanStackQueryProvider>
          <ImageViewContextProvider>
            <ImageView />
            {children}
          </ImageViewContextProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
