import { z } from "zod";

export const awardSchema = z.object({
  name: z.string().min(1),
  /** Who granted the award, e.g. a university or an event organizer. */
  issuer: z.string().min(1),
  /** What the award is for; may contain `**bold**` markers. */
  description: z.string().min(1).optional(),
  /** Each time the award was received, e.g. a semester or a course name. */
  occurrences: z.array(z.string().min(1)).min(1),
  url: z.url().optional(),
});

export type Award = z.infer<typeof awardSchema>;
