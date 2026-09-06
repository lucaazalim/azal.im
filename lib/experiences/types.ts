import { yearMonthSchema } from "@/lib/dates";
import { z } from "zod";

export const LOCATION_TYPES = {
  "on-site": "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
} as const;

export const locationTypeSchema = z.enum(
  Object.keys(LOCATION_TYPES) as [keyof typeof LOCATION_TYPES],
);

export type LocationType = z.infer<typeof locationTypeSchema>;

/**
 * A description is an intro made of one or more paragraphs followed by an
 * optional list of highlights (rendered as bullet points). Text may contain
 * `**bold**` markers; see `lib/rich-text.ts`.
 */
export const descriptionSchema = z.object({
  paragraphs: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).default([]),
});

export type Description = z.infer<typeof descriptionSchema>;

const dateRangeSchema = {
  startDate: yearMonthSchema,
  /** `null` means the entry is ongoing ("Present"). */
  endDate: yearMonthSchema.nullable(),
};

export const positionSchema = z
  .object({
    type: z.literal("position"),
    title: z.string().min(1),
    company: z.object({
      name: z.string().min(1),
      url: z.url().optional(),
      /** One-line summary of the company, shown on the resume. */
      description: z.string().min(1).optional(),
    }),
    ...dateRangeSchema,
    location: z
      .object({
        name: z.string().min(1),
        type: locationTypeSchema.optional(),
      })
      .optional(),
    description: z.object({
      /** The comprehensive description, as written on LinkedIn. */
      full: descriptionSchema,
      /** A shorter version used where space is limited (e.g. the resume). */
      concise: descriptionSchema,
    }),
    skills: z.array(z.string().min(1)),
  })
  .refine(
    (position) => !position.endDate || position.endDate >= position.startDate,
    {
      message: "endDate must not be earlier than startDate",
      path: ["endDate"],
    },
  );

export const careerBreakSchema = z
  .object({
    type: z.literal("career-break"),
    /** LinkedIn's career break category, e.g. "Professional development". */
    title: z.string().min(1),
    ...dateRangeSchema,
    location: z.object({ name: z.string().min(1) }).optional(),
    description: descriptionSchema.optional(),
  })
  .refine((entry) => !entry.endDate || entry.endDate >= entry.startDate, {
    message: "endDate must not be earlier than startDate",
    path: ["endDate"],
  });

export const experienceSchema = z.discriminatedUnion("type", [
  positionSchema,
  careerBreakSchema,
]);

export type Position = z.infer<typeof positionSchema>;
export type CareerBreak = z.infer<typeof careerBreakSchema>;
export type Experience = z.infer<typeof experienceSchema>;
