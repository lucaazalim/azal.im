import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cv/:lang*",
        destination: "/resume/:lang*",
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
