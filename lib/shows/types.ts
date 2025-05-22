import { z } from "zod";

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
  recommended: z.enum(["yes", "no", "maybe", "favorite"]),
});

export type Show = z.infer<typeof showSchema>;

export type ShowRecommended = z.infer<typeof showSchema>["recommended"];

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
  recommended: showSchema.shape.recommended.optional(),
  genre: z.string().optional(),
});

export type ShowFilters = z.infer<typeof showFilterSchema>;
