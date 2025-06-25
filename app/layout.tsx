import ImageView from "@/app/(home)/_components/image-view/ImageView";
import { ImageViewContextProvider } from "@/app/(home)/_components/image-view/ImageViewContext";
import TailwindBreakpoint from "@/app/_components/TailwindBreakpoint";
import TanStackQueryProvider from "@/app/_components/TanStackQueryProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luca Azalim",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const development = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      className="dark selection:bg-primary/30 selection:text-primary scroll-smooth"
      style={{
        scrollbarGutter: "stable",
      }}
    >
      {!development && (
        <head>
          <GoogleAnalytics gaId="G-1PK2PWGZCQ" />
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="f2fe2e82-8811-4558-a838-47c17f3ea936"
          />
        </head>
      )}
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${merriweather.variable} bg-background`}
      >
        <TanStackQueryProvider>
          <ImageViewContextProvider>
            <NavBar />
            <ImageView />
            <main className="pt-[var(--navbar-height)]">{children}</main>
            <Footer />
            {development && <TailwindBreakpoint />}
          </ImageViewContextProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
