import { z } from "zod";

export const MODALITIES = ["in-person", "hybrid", "virtual"] as const;

export const courseSchema = z.object({
  period: z.number().int().min(1).max(8),
  id: z.number().int().positive(),
  name: z.object({
    pt: z.string().min(1),
    en: z.string().min(1),
  }),
  syllabus: z.object({
    pt: z.string().min(1),
    en: z.string().min(1),
  }),
  grade: z.number().int().min(0).max(100).nullable(),
  hours: z.number().int().positive(),
  modality: z.enum(MODALITIES),
});

export type Course = z.infer<typeof courseSchema>;

export type PeriodSummary = {
  totalHours: number;
  completedHours: number;
  averageGrade: number | null;
};
