import ImageView from "@/app/(home)/_components/image-view/ImageView";
import { ImageViewContextProvider } from "@/app/(home)/_components/image-view/ImageViewContext";
import TailwindBreakpoint from "@/app/_components/TailwindBreakpoint";
import TanStackQueryProvider from "@/app/_components/TanStackQueryProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import NavBar from "./_components/NavBar";
import "./globals.css";
import { BASE_URL, routes } from "@/lib/constants";

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
  title: {
    default: "Luca Azalim - Software Engineer",
    template: "%s | Luca Azalim"
  },
  description: "Software Engineer passionate about building scalable applications and sharing knowledge through writing and open source contributions.",
  keywords: ["software engineer", "full-stack developer", "react", "next.js", "typescript", "web development"],
  authors: [{ name: "Luca Azalim" }],
  creator: "Luca Azalim",
  publisher: "Luca Azalim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: routes.home,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Luca Azalim",
    title: "Luca Azalim - Software Engineer",
    description: "Software Engineer passionate about building scalable applications and sharing knowledge through writing and open source contributions.",
    images: [
      {
        url: routes.api.og("Luca Azalim", "Software Engineer"),
        width: 1200,
        height: 630,
        alt: "Luca Azalim - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Azalim - Software Engineer",
    description: "Software Engineer passionate about building scalable applications and sharing knowledge through writing and open source contributions.",
    images: [routes.api.og("Luca Azalim", "Software Engineer")],
    creator: "@lucaazalim",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Luca Azalim",
  "description": "Software Engineer passionate about building scalable applications and sharing knowledge through writing and open source contributions.",
  "url": BASE_URL,
  "author": {
    "@type": "Person",
    "name": "Luca Azalim",
    "jobTitle": "Software Engineer",
    "url": BASE_URL
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
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
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${merriweather.variable} bg-background`}
      >
        <TanStackQueryProvider>
          <ImageViewContextProvider>
            <NavBar />
            <ImageView />
            <main className="pt-[var(--navbar-height)]">{children}</main>
            {/* <Footer /> */}
            {development && <TailwindBreakpoint />}
          </ImageViewContextProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
