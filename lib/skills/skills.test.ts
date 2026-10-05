import { describe, expect, it } from "vitest";
import { formatYears, skillGroups, skills, yearsOfExperience } from "./skills";

describe("skills data", () => {
  it("loads every group from data/skills.json", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThanOrEqual(skillGroups.length);
  });

  it("lists each skill only once", () => {
    const names = skills.map((skill) => skill.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it("has no skill starting in the future", () => {
    const year = new Date().getFullYear();
    expect(skills.every((skill) => skill.since <= year)).toBe(true);
  });
});

describe("yearsOfExperience", () => {
  const now = new Date(2026, 9, 5);

  it("counts whole calendar years since the skill was picked up", () => {
    expect(yearsOfExperience({ name: "Java", since: 2014 }, now)).toBe(12);
  });

  it("counts a skill picked up this year as one year", () => {
    expect(yearsOfExperience({ name: "Rust", since: 2026 }, now)).toBe(1);
  });
});

describe("formatYears", () => {
  it("pluralizes", () => {
    expect(formatYears(1)).toBe("1 yr");
    expect(formatYears(12)).toBe("12 yrs");
  });
});
