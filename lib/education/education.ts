import rawEducation from "@/data/education.json";
import { loadCollection } from "@/lib/data/load";
import { isFutureYearMonth } from "@/lib/dates";
import { Education, educationSchema } from "./types";

/** Education entries, most recent first. */
export const education: Education[] = loadCollection(
  rawEducation,
  educationSchema,
  "education",
);

/** `Bachelor's Degree in Software Engineering` */
export function formatDegree(entry: Education): string {
  return `${entry.degree} in ${entry.fieldOfStudy}`;
}

/** Whether the program has not finished yet (end date is in the future). */
export function isInProgress(
  entry: Education,
  now: Date = new Date(),
): boolean {
  return entry.endDate === null || isFutureYearMonth(entry.endDate, now);
}
