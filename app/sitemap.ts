import { getPosts } from "@/lib/blog/posts";
import { BASE_URL, routes } from "@/lib/constants";
import { PLAYLISTS } from "@/lib/videos/videos";
import { MetadataRoute } from "next";

// Import the cv array from the CV page
import { cv } from "./cv/[lang]/page";

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
  ...cv.map((cv) => routes.cv + `/${cv.id}`),
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
    changeFrequency: 'monthly' as const,
    priority: route === routes.home ? 1 : 0.8,
  }),
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return STATIC_ROUTES_SITEMAP;
}
