import ImageView from "@/app/(home)/_components/image-view/ImageView";
import { ImageViewContextProvider } from "@/app/(home)/_components/image-view/ImageViewContext";
import TailwindBreakpoint from "@/app/_components/TailwindBreakpoint";
import TanStackQueryProvider from "@/app/_components/TanStackQueryProvider";
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
      className="dark selection:bg-primary/30 selection:text-primary scroll-smooth"
      style={{
        scrollbarGutter: "stable",
      }}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Luca Azalim" />
      </head>
      <body className={`${inter.className} bg-background`}>
        <TanStackQueryProvider>
          <ImageViewContextProvider>
            <ImageView />
            {children}
          </ImageViewContextProvider>
        </TanStackQueryProvider>
        {process.env.NODE_ENV === "development" && <TailwindBreakpoint />}
      </body>
    </html>
  );
}
