import { MoviesRequest } from "./movies/types";
import { Language } from "./types";
import { objectToSearchParams } from "./utils";

export const BASE_URL = process.env.BASE_URL || "https://azal.im";
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

export const PROJECT_PAGE_SLUGS = ["90ti-docs"]; // Projects with special pages

export type ProjectSlug = (typeof PROJECT_PAGE_SLUGS)[number];

export const ROUTES = {
  home: "/",
  blog: (slug?: string) => (slug ? `/blog/${slug}` : "/blog"),
  videos: (playlistSlug?: string) => `/videos/${playlistSlug ?? ""}`,
  movies: "/movies",
  academics: "/academics",
  resume: (lang?: Language) => (lang ? `/resume/${lang}` : "/resume"),
  projects: (project?: ProjectSlug) =>
    project ? `/projects/${project}` : "/projects",
  contact: "/contact",
  api: {
    root: "/api",
    og: (title: string, description?: string) => {
      return `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}`;
    },
    movies: (request: MoviesRequest) => {
      return `/api/movies?${objectToSearchParams(request)}`;
    },
    contact: "/api/contact",
  },
  sitemap: "/sitemap.xml",
};
