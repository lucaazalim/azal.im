import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1),
  /** The year I started using the skill; years of experience derive from it. */
  since: z.int().min(2000),
});

export const skillGroupSchema = z.object({
  /** e.g. "Languages" or "Frameworks". */
  category: z.string().min(1),
  skills: z.array(skillSchema).min(1),
});

export type Skill = z.infer<typeof skillSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
