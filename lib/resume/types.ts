import { z } from "zod";

export const resumeSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  contacts: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().min(1),
      }),
    )
    .min(1),
  /** May contain `**bold**` markers. */
  summary: z.string().min(1),
  technicalSkills: z
    .array(
      z.object({
        category: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  languages: z
    .array(
      z.object({
        name: z.string().min(1),
        level: z.string().min(1),
      }),
    )
    .min(1),
});

export type Resume = z.infer<typeof resumeSchema>;
