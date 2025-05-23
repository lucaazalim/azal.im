import { z } from "zod";
import { paginatedRequestSchema } from "../types";

export const MAX_SHOW_STARS = 5;

export const showSchema = z.object({
  watched_at: z
    .string()
    .regex(/^\d{2}-\d{4}$/)
    .transform((watchedAt) => {
      return new Date(`01-${watchedAt}`);
    })
    .optional(),
  title: z.string().min(1),
  platform: z
    .enum([
      "Netflix",
      "Cinema",
      "YouTube",
      "Popcorn Time",
      "HBO GO",
      "Prime",
      "Telecine",
      "Stremio",
      "Disney+",
      "HBO Max",
      "Globoplay",
      "Apple TV+",
      "Star+",
      "TV",
    ])
    .optional(),
  type: z.enum(["movie", "series", "documentary", "miniseries"]),
  year: z.number().min(1900).max(new Date().getFullYear()),
  stars: z.number().int().min(1).max(MAX_SHOW_STARS),
});

export type Show = z.infer<typeof showSchema>;

export type ShowMetadata = {
  title: string;
  original_title: string;
  language: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  genres: string[];
};

export type ShowWithMetadata = Show & {
  metadata: ShowMetadata;
};

export const showFilterSchema = z.object({
  title: z.string().optional(),
  stars: z.coerce.number().int().min(1).max(MAX_SHOW_STARS).optional(),
  genre: z.string().optional(),
});

export type ShowFilters = z.infer<typeof showFilterSchema>;

export const showsRequestSchema = showFilterSchema.and(paginatedRequestSchema);

export type ShowsRequest = z.infer<typeof showsRequestSchema>;
