import { z } from "zod";

export const projectSchema = z.object({
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional(),
  image: z.array(z.string().min(1)),
  title: z.string().min(1),
  subtitle: z.string().min(1).optional(),
  description: z.string().min(1),
  skills: z.array(z.string().min(1)),
  urls: z.object({
    specialPage: z.string().min(1).optional(),
    sourceCode: z.string().min(1).optional(),
    live: z.string().min(1).optional(),
  }),
});

export type Project = z.infer<typeof projectSchema>;
