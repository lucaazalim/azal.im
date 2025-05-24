export const ROUTES = {
  HOME: "/",
  BLOG: "/blog",
  VIDEOS: (playlistSlug?: string) => `/videos/${playlistSlug ?? ""}`,
  SHOWS: "/movies",
  OG: (title: string, description?: string) => {
    return `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description || "")}`;
  },
};
