/**
 * Homepage sections, in page order. Drives both the section index in the hero
 * and the number shown next to each section title, so the two never drift.
 */
export const HOME_SECTIONS = {
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  awards: "Awards",
} as const;

export type HomeSectionId = keyof typeof HOME_SECTIONS;

/** `01`, `02`, … for a section, by its position on the page. */
export function sectionNumber(id: HomeSectionId): string {
  const index = Object.keys(HOME_SECTIONS).indexOf(id) + 1;
  return String(index).padStart(2, "0");
}

/**
 * The two-column grid every homepage block sits on: a narrow left column
 * (portrait, section titles) and a wide right one (content).
 */
export const homeGridClassName =
  "grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14";

/** List item with a small square marker, matching the site's square style. */
export const bulletClassName =
  "before:bg-primary/70 relative pl-5 before:absolute before:top-[0.6em] before:left-0.5 before:size-1.5";
