import { getPosts } from "@/lib/blog/posts";
import { BASE_URL, routes } from "@/lib/constants";
import { PLAYLISTS } from "@/lib/videos/videos";
import { MetadataRoute } from "next";

const STATIC_ROUTES = [
  routes.home,
  routes.blog(),
  routes.movies,
  routes.academics,
  routes.cv,
  ...PLAYLISTS.map((playlist) => routes.videos(playlist.slug)),
  ...Object.keys(routes.projects).map(
    (key) => routes.projects[key as keyof typeof routes.projects],
  ),
  routes.contact,
];

const STATIC_ROUTES_SITEMAP: MetadataRoute.Sitemap = STATIC_ROUTES.map(
  (route) => ({
    url: BASE_URL + route,
  }),
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const postsSitemap = posts.map((post) => ({
    url: BASE_URL + post.route,
  })) satisfies MetadataRoute.Sitemap;

  return [...STATIC_ROUTES_SITEMAP, ...postsSitemap];
}
