import rawSkills from "@/data/skills.json";
import { loadCollection } from "@/lib/data/load";
import { Skill, SkillGroup, skillGroupSchema } from "./types";

/** Skills shown on the homepage, grouped by category, in display order. */
export const skillGroups: SkillGroup[] = loadCollection(
  rawSkills,
  skillGroupSchema,
  "skills",
);

/** Every skill across all categories, in display order. */
export const skills: Skill[] = skillGroups.flatMap((group) => group.skills);

/**
 * Whole calendar years since the skill was picked up. A skill started this
 * year still counts as one year, so the homepage never shows "0 yrs".
 */
export function yearsOfExperience(
  skill: Skill,
  now: Date = new Date(),
): number {
  return Math.max(1, now.getFullYear() - skill.since);
}

/** `1 yr`, `12 yrs` */
export function formatYears(years: number): string {
  return `${years} ${years === 1 ? "yr" : "yrs"}`;
}
