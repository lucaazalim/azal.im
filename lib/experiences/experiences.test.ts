import { describe, expect, it } from "vitest";
import { experiences, isCurrent, isPosition, positions } from "./experiences";

describe("experiences data", () => {
  it("loads every entry from data/experiences.json", () => {
    expect(experiences.length).toBeGreaterThan(0);
    expect(positions.length).toBeLessThanOrEqual(experiences.length);
    expect(positions.every(isPosition)).toBe(true);
  });

  it("is ordered from most recent to oldest", () => {
    const starts = experiences.map((experience) => experience.startDate);
    const sorted = [...starts].sort().reverse();
    expect(starts).toEqual(sorted);
  });

  it("has both a full and a concise description for every position", () => {
    for (const position of positions) {
      expect(position.description.full.paragraphs.length).toBeGreaterThan(0);
      expect(position.description.concise.length).toBeGreaterThan(0);
    }
  });
});

describe("isCurrent", () => {
  it("is true when there is no end date", () => {
    expect(isCurrent({ ...positions[0], endDate: null })).toBe(true);
    expect(isCurrent({ ...positions[0], endDate: "2025-05" })).toBe(false);
  });
});
