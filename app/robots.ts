import { BASE_URL, ROUTES } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [ROUTES.api.root],
    },
    sitemap: BASE_URL + ROUTES.sitemap,
  };
}
