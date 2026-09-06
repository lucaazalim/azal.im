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

export function formatLocationType(
  type: NonNullable<NonNullable<Position["location"]>["type"]>,
): string {
  return LOCATION_TYPES[type];
}

/**
 * Renders a location the way LinkedIn does: `City, State, Country · Remote`.
 */
export function formatLocation(location: Position["location"]): string | null {
  if (!location) {
    return null;
  }

  return location.type
    ? `${location.name} · ${formatLocationType(location.type)}`
    : location.name;
}
