import { z } from "zod";

/**
 * A calendar month in `YYYY-MM` form. LinkedIn-style date ranges only carry
 * month precision, so this is the unit used by experiences and education.
 */
export const yearMonthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected a date in YYYY-MM format");

export type YearMonth = z.infer<typeof yearMonthSchema>;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type MonthStyle = "short" | "long";

export function parseYearMonth(value: YearMonth): {
  year: number;
  month: number;
} {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function currentYearMonth(now: Date = new Date()): YearMonth {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

export function formatYearMonth(
  value: YearMonth,
  style: MonthStyle = "short",
): string {
  const { year, month } = parseYearMonth(value);
  const name = MONTHS[month - 1];
  return `${style === "short" ? name.slice(0, 3) : name} ${year}`;
}

/**
 * Formats a range like `Jul 2025 – Present` or `Jun 2024 – May 2025`.
 */
export function formatYearMonthRange(
  start: YearMonth,
  end: YearMonth | null,
  style: MonthStyle = "short",
): string {
  const to = end ? formatYearMonth(end, style) : "Present";
  return `${formatYearMonth(start, style)} – ${to}`;
}

/**
 * Number of months covered by a range, counting both ends (LinkedIn counts
 * `Jun 2024 – May 2025` as 12 months, i.e. "1 yr").
 */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  const from = parseYearMonth(start);
  const to = parseYearMonth(end);
  const months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  return Math.max(months, 1);
}

/**
 * Formats a month count the way LinkedIn does: `1 yr 3 mos`, `7 yrs`, `1 mo`.
 */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (remainder > 0 || parts.length === 0) {
    parts.push(`${remainder} ${remainder === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

export function formatYearMonthRangeDuration(
  start: YearMonth,
  end: YearMonth | null,
  now: Date = new Date(),
): string {
  return formatDuration(monthsBetween(start, end ?? currentYearMonth(now)));
}

export function isFutureYearMonth(
  value: YearMonth,
  now: Date = new Date(),
): boolean {
  return value > currentYearMonth(now);
}
