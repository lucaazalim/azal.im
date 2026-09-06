import { z } from "zod";

/**
 * Validates raw data against `schema`, returning the typed value.
 *
 * Throws a single, readable error listing every offending entry/field so a
 * malformed hand-edited data file fails loudly at load time rather than
 * surfacing as a confusing runtime error later.
 */
export function loadDocument<S extends z.ZodType>(
  data: unknown,
  schema: S,
  label: string,
): z.infer<S> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const path = issue.path.map(String).join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
      })
      .join("; ");

    throw new Error(`Invalid ${label} data: ${details}`);
  }

  return parsed.data;
}

/**
 * Validates raw data as an array of `schema`, returning the typed collection.
 */
export function loadCollection<S extends z.ZodType>(
  data: unknown,
  schema: S,
  label: string,
): z.infer<S>[] {
  return loadDocument(data, z.array(schema), label);
}
