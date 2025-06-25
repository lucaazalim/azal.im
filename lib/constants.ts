import { MoviesRequest } from "./movies/types";
import { objectToSearchParams } from "./utils";

export const routes = {
  home: "/",
  blog: "/blog",
  videos: (playlistSlug?: string) => `/videos/${playlistSlug ?? ""}`,
  movies: "/movies",
  academics: "/academics",
  cv: "/cv",
  projects: {
    "90ti-docs": "/projects/90ti-docs",
  },
  contact: "/contact",
  api: {
    og: (title: string, description?: string) => {
      return `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}`;
    },
    movies: (request: MoviesRequest) => {
      return `/api/movies?${objectToSearchParams(request)}`;
    },
    contact: "/api/contact",
  },
};
