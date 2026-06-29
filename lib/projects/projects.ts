import rawProjects from "@/data/projects.json";
import { loadCollection } from "@/lib/data/load";
import { Project, projectSchema } from "./types";

export const projects: Project[] = loadCollection(
  rawProjects,
  projectSchema,
  "projects",
);
