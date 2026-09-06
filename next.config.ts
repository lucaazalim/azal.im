import type { NextConfig } from "next";
import { RESUME_PDF_FILENAME } from "./lib/constants";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cv/:path*",
        destination: "/resume",
        permanent: true,
      },
      {
        // The resume used to live at /resume/en and /resume/pt.
        source: "/resume/:lang(en|pt)",
        destination: "/resume",
        permanent: true,
      },
      {
        // The old PDFs, in case they are still linked from elsewhere.
        source: "/resume/en.pdf",
        destination: `/resume/${RESUME_PDF_FILENAME}`,
        permanent: true,
      },
      {
        source: "/resume/pt.pdf",
        destination: "/resume",
        permanent: true,
      },
      {
        source: "/major",
        destination: "/academics",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
