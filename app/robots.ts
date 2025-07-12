import { BASE_URL, routes } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.api.root],
    },
    sitemap: BASE_URL + routes.sitemap,
  };
}
