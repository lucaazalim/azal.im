import rawExperiences from "@/data/experiences.json";
import { loadCollection } from "@/lib/data/load";
import { Experience, experienceSchema, Position } from "./types";

/**
 * Every experience entry, in the order they appear on LinkedIn
 * (most recent first). Career breaks are included.
 */
export const experiences: Experience[] = loadCollection(
  rawExperiences,
  experienceSchema,
  "experiences",
);

/** Only actual positions, i.e. everything except career breaks. */
export const positions: Position[] = experiences.filter(isPosition);

export function isPosition(experience: Experience): experience is Position {
  return experience.type === "position";
}

export function isCurrent(experience: Experience): boolean {
  return experience.endDate === null;
}
