import { z } from "zod";
import { paginatedRequestSchema } from "../types";

export const MAX_MOVIE_STARS = 5;

export const TYPES = ["movie", "series", "documentary", "miniseries"] as const;

export const PLATFORMS = [
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
] as const;

export const movieSchema = z.object({
  watchedAt: z
    .string()
    .regex(/^\d{2}-\d{4}$/)
    .transform((watchedAt) => {
      return new Date(`01-${watchedAt}`);
    })
    .optional(),
  title: z.string().min(1),
  platform: z.enum(PLATFORMS).optional(),
  type: z.enum(TYPES),
  year: z.number().min(1900).max(new Date().getFullYear()),
  stars: z.number().int().min(1).max(MAX_MOVIE_STARS),
});

export type Movie = z.infer<typeof movieSchema>;

export const movieMetadataSchema = z.object({
  title: z.string(),
  original_title: z.string(),
  language: z.string(),
  overview: z.string(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable(),
  release_date: z.string().transform((date) => new Date(date)),
  runtime: z.number().int().min(0).nullable(),
  genres: z.array(z.string()),
});

export type MovieMetadata = z.infer<typeof movieMetadataSchema>;

export type MovieWithMetadata = Movie & {
  metadata: MovieMetadata;
};

export const movieFilterSchema = z.object({
  title: z.string().optional(),
  type: movieSchema.shape.type.optional(),
  stars: z.coerce.number().int().min(1).max(MAX_MOVIE_STARS).optional(),
  genre: z.string().optional(),
  runtime: z.coerce.number().int().min(0).optional(),
});

export type MovieFilters = z.infer<typeof movieFilterSchema>;

export const moviesRequestSchema = movieFilterSchema.and(
  paginatedRequestSchema,
);

export type MoviesRequest = z.infer<typeof moviesRequestSchema>;
