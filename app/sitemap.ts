import { getPosts } from "@/lib/blog/posts";
import { BASE_URL, routes } from "@/lib/constants";
import { PLAYLISTS } from "@/lib/videos/videos";
import { MetadataRoute } from "next";
import { resumes } from "../lib/resume/resume";

const STATIC_ROUTES = [
  // Home
  routes.home,
  // Blog
  routes.blog(),
  // Blog posts
  ...(await getPosts()).map((post) => routes.blog(post.slug)),
  // Movies
  routes.movies,
  // Academics
  routes.academics,
  // CV
  ...Object.keys(resumes).map((lang) =>
    routes.resume(lang as keyof typeof resumes),
  ),
  // Videos
  ...PLAYLISTS.map((playlist) => routes.videos(playlist.slug)),
  // Projects
  ...Object.keys(routes.projects).map(
    (key) => routes.projects[key as keyof typeof routes.projects],
  ),
  // Contact
  routes.contact,
];

const STATIC_ROUTES_SITEMAP: MetadataRoute.Sitemap = STATIC_ROUTES.map(
  (route) => ({
    url: BASE_URL + route,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === routes.home ? 1 : 0.8,
  }),
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return STATIC_ROUTES_SITEMAP;
}
