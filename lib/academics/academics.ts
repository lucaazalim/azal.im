import rawCourses from "@/data/courses.json";
import { loadCollection } from "@/lib/data/load";
import { Course, courseSchema, SemesterSummary } from "./types";

export const SEMESTERS = 8;

export const courses: Course[] = loadCollection(
  rawCourses,
  courseSchema,
  "courses",
);

export function getSemesterSummary(courses: Course[]): SemesterSummary {
  const totalHours = courses.reduce((sum, course) => sum + course.hours, 0);
  const completedCourses = courses.filter((course) => !!course.grade);

  const completedHours = completedCourses.reduce(
    (sum, course) => sum + course.hours,
    0,
  );

  const averageGrade =
    completedCourses.length === 0
      ? null
      : completedCourses.reduce((sum, course) => sum + (course.grade ?? 0), 0) /
        completedCourses.length;

  return {
    totalHours,
    completedHours,
    averageGrade,
  };
}
