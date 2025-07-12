import { z } from "zod";

export const languageSchema = z.enum(["en", "pt"]);
export type Language = z.infer<typeof languageSchema>;

export const paginatedRequestSchema = z.object({
  cursor: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type PaginatedRequest = z.infer<typeof paginatedRequestSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  nextCursor?: number;
  hasMore: boolean;
};
