import { describe, expect, it } from "vitest";
import { getSemesterSummary } from "@/lib/academics/academics";
import { Course } from "@/lib/academics/types";

function makeCourse(overrides: Partial<Course>): Course {
  return {
    semester: 1,
    name: { pt: "Curso", en: "Course" },
    syllabus: { pt: "Ementa", en: "Syllabus" },
    grade: null,
    hours: 60,
    modality: "in-person",
    ...overrides,
  };
}

describe("getSemesterSummary", () => {
  it("returns zeroed summary for an empty array", () => {
    expect(getSemesterSummary([])).toEqual({
      totalHours: 0,
      completedHours: 0,
      averageGrade: null,
    });
  });

  it("computes totals when all courses are graded", () => {
    const courses = [
      makeCourse({ hours: 60, grade: 80 }),
      makeCourse({ hours: 40, grade: 90 }),
    ];

    expect(getSemesterSummary(courses)).toEqual({
      totalHours: 100,
      completedHours: 100,
      averageGrade: 85,
    });
  });

  it("only counts graded courses toward completedHours and averageGrade", () => {
    const courses = [
      makeCourse({ hours: 60, grade: 80 }),
      makeCourse({ hours: 40, grade: null }),
    ];

    expect(getSemesterSummary(courses)).toEqual({
      totalHours: 100,
      completedHours: 60,
      averageGrade: 80,
    });
  });

  it("treats a grade of 0 as not-completed (characterization)", () => {
    const courses = [
      makeCourse({ hours: 60, grade: 0 }),
      makeCourse({ hours: 40, grade: 100 }),
    ];

    expect(getSemesterSummary(courses)).toEqual({
      totalHours: 100,
      completedHours: 40,
      averageGrade: 100,
    });
  });

  it("returns null averageGrade when no course has a truthy grade", () => {
    const courses = [
      makeCourse({ hours: 60, grade: null }),
      makeCourse({ hours: 40, grade: 0 }),
    ];

    expect(getSemesterSummary(courses)).toEqual({
      totalHours: 100,
      completedHours: 0,
      averageGrade: null,
    });
  });
});
