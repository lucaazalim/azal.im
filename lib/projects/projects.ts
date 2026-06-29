import { readFileSync } from "fs";
import path from "path";
import { z } from "zod";
import { Project, projectSchema } from "./types";

const PROJECTS_PATH = path.join(process.cwd(), "data/projects.json");

export function getProjects(filePath: string = PROJECTS_PATH): Project[] {
  // Read the projects.json file
  const fileContent = readFileSync(filePath, "utf-8");
  const projectsData = JSON.parse(fileContent);

  // Validate the data is an array
  if (!Array.isArray(projectsData)) {
    throw new Error("Projects data must be an array");
  }

  // Validate each project against the schema and return the array
  return projectsData.map((project, index) => {
    try {
      return projectSchema.parse(project);
    } catch (error) {
      throw new Error(
        `Validation failed for project at index ${index}: ${error instanceof z.ZodError ? error.message : "Unknown error"}`,
      );
    }
  });
}
