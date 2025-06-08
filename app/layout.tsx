import ImageView from "@/app/(home)/_components/image-view/ImageView";
import { ImageViewContextProvider } from "@/app/(home)/_components/image-view/ImageViewContext";
import TailwindBreakpoint from "@/app/_components/TailwindBreakpoint";
import TanStackQueryProvider from "@/app/_components/TanStackQueryProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import NavBar from "./_components/NavBar";
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
      <GoogleTagManager gtmId="GTM-TC74JZ8S" />
      <body className={`${inter.className} bg-background`}>
        <NavBar />
        <main className="pt-[var(--navbar-height)]">
          <TanStackQueryProvider>
            <ImageViewContextProvider>
              <ImageView />
              {children}
            </ImageViewContextProvider>
          </TanStackQueryProvider>
        </main>
        {process.env.NODE_ENV === "development" && <TailwindBreakpoint />}
      </body>
    </html>
  );
}
