import { MoviesRequest } from "./movies/types";
import { objectToSearchParams } from "./utils";

export const routes = {
  home: "/",
  blog: "/blog",
  videos: (playlistSlug?: string) => `/videos/${playlistSlug ?? ""}`,
  shows: "/movies",
  major: "/major",
  api: {
    og: (title: string, description?: string) => {
      return `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}`;
    },
    movies: (request: MoviesRequest) => {
      return `/api/movies?${objectToSearchParams(request)}`;
    },
  },
};
