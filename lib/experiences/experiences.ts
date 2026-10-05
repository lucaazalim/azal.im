import rawExperiences from "@/data/experiences.json";
import { loadCollection } from "@/lib/data/load";
import {
  Experience,
  experienceSchema,
  LOCATION_TYPES,
  Position,
} from "./types";

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

/**
 * LinkedIn-style location line, e.g. `Orlando, United States · Remote`.
 * Returns `null` when the entry has no location.
 */
export function formatLocation(experience: Experience): string | null {
  const { location } = experience;

  if (!location) {
    return null;
  }

  const type =
    "type" in location && location.type ? LOCATION_TYPES[location.type] : null;

  return type ? `${location.name} · ${type}` : location.name;
}
