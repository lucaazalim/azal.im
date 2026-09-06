import { yearMonthSchema } from "@/lib/dates";
import { z } from "zod";

export const educationSchema = z
  .object({
    school: z.object({
      name: z.string().min(1),
      shortName: z.string().min(1).optional(),
      url: z.url().optional(),
    }),
    degree: z.string().min(1),
    fieldOfStudy: z.string().min(1),
    startDate: yearMonthSchema,
    /** `null` means the program is ongoing with no expected end date. */
    endDate: yearMonthSchema.nullable(),
    skills: z.array(z.string().min(1)).default([]),
  })
  .refine((entry) => !entry.endDate || entry.endDate >= entry.startDate, {
    message: "endDate must not be earlier than startDate",
    path: ["endDate"],
  });

export type Education = z.infer<typeof educationSchema>;
