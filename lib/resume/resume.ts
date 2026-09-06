import rawResume from "@/data/resume.json";
import { loadDocument } from "@/lib/data/load";
import { Resume, resumeSchema } from "./types";

/**
 * Resume-only content (header, summary, skills, languages). Professional
 * experience and education come from `lib/experiences` and `lib/education`
 * so the resume page, the PDF, and the homepage share a single source of
 * truth.
 */
export const resume: Resume = loadDocument(rawResume, resumeSchema, "resume");
