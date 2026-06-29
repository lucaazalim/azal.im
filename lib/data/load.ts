import { z } from "zod";

/**
 * Validates raw data as an array of `schema`, returning the typed collection.
 *
 * Throws a single, readable error listing every offending entry/field so a
 * malformed hand-edited data file fails loudly at load time rather than
 * surfacing as a confusing runtime error later.
 */
export function loadCollection<S extends z.ZodTypeAny>(
  data: unknown,
  schema: S,
  label: string,
): z.infer<S>[] {
  const parsed = z.array(schema).safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
      })
      .join("; ");

    throw new Error(`Invalid ${label} data: ${details}`);
  }

  return parsed.data;
}
