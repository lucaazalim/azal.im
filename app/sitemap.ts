import { getPosts } from "@/lib/blog/posts";
import { BASE_URL, PROJECT_PAGE_SLUGS, ROUTES } from "@/lib/constants";
import { PLAYLISTS } from "@/lib/videos/videos";
import { MetadataRoute } from "next";
import { resumes } from "../lib/resume/resume";

const STATIC_ROUTES = [
  // Home
  ROUTES.home,
  // Blog
  ROUTES.blog(),
  // Blog posts
  ...(await getPosts()).map((post) => ROUTES.blog(post.slug)),
  // Movies
  ROUTES.movies,
  // Academics
  ROUTES.academics,
  // CV
  ...Object.keys(resumes).map((lang) =>
    ROUTES.resume(lang as keyof typeof resumes),
  ),
  // Videos
  ...PLAYLISTS.map((playlist) => ROUTES.videos(playlist.slug)),
  // Projects
  ROUTES.projects(),
  ...PROJECT_PAGE_SLUGS.map((route) => ROUTES.projects(route)),
  // Contact
  ROUTES.contact,
];

const STATIC_ROUTES_SITEMAP: MetadataRoute.Sitemap = STATIC_ROUTES.map(
  (route) => ({
    url: BASE_URL + route,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === ROUTES.home ? 1 : 0.8,
  }),
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return STATIC_ROUTES_SITEMAP;
}
