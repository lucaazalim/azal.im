import { readFileSync } from "fs";
import path from "path";
import { z } from "zod";
import { Course, courseSchema, PeriodSummary } from "./types";

const COURSES_PATH = path.join(process.cwd(), "data/major/courses.json");

export const MAX_PERIODS = 8;

export function getCourses(filePath: string = COURSES_PATH): Course[] {
  // Read the courses.json file
  const fileContent = readFileSync(filePath, "utf-8");
  const coursesData = JSON.parse(fileContent);

  // Validate the data is an array
  if (!Array.isArray(coursesData)) {
    throw new Error("Courses data must be an array");
  }

  // Validate each course against the schema and return the array
  const validatedCourses = coursesData.map((course, index) => {
    try {
      return courseSchema.parse(course);
    } catch (error) {
      throw new Error(
        `Validation failed for course at index ${index}: ${error instanceof z.ZodError ? error.message : "Unknown error"}`,
      );
    }
  });

  return validatedCourses;
}

export function getPeriodSummary(courses: Course[]): PeriodSummary {
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
