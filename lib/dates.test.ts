import { describe, expect, it } from "vitest";
import {
  currentYearMonth,
  formatDuration,
  formatYearMonth,
  formatYearMonthRange,
  formatYearMonthRangeDuration,
  isFutureYearMonth,
  monthsBetween,
  parseYearMonth,
  yearMonthSchema,
} from "./dates";

describe("yearMonthSchema", () => {
  it("accepts YYYY-MM values", () => {
    expect(yearMonthSchema.safeParse("2025-07").success).toBe(true);
    expect(yearMonthSchema.safeParse("2014-12").success).toBe(true);
  });

  it("rejects malformed values", () => {
    expect(yearMonthSchema.safeParse("2025-7").success).toBe(false);
    expect(yearMonthSchema.safeParse("2025-13").success).toBe(false);
    expect(yearMonthSchema.safeParse("2025-07-01").success).toBe(false);
    expect(yearMonthSchema.safeParse("July 2025").success).toBe(false);
  });
});

describe("parseYearMonth", () => {
  it("splits into numeric year and month", () => {
    expect(parseYearMonth("2025-07")).toEqual({ year: 2025, month: 7 });
  });
});

describe("currentYearMonth", () => {
  it("formats the given date", () => {
    expect(currentYearMonth(new Date(2026, 8, 6))).toBe("2026-09");
    expect(currentYearMonth(new Date(2026, 11, 1))).toBe("2026-12");
  });
});

describe("formatYearMonth", () => {
  it("uses short month names by default", () => {
    expect(formatYearMonth("2025-07")).toBe("Jul 2025");
  });

  it("supports long month names", () => {
    expect(formatYearMonth("2025-07", "long")).toBe("July 2025");
  });
});

describe("formatYearMonthRange", () => {
  it("renders open-ended ranges as Present", () => {
    expect(formatYearMonthRange("2025-07", null)).toBe("Jul 2025 – Present");
  });

  it("renders closed ranges", () => {
    expect(formatYearMonthRange("2024-06", "2025-05")).toBe(
      "Jun 2024 – May 2025",
    );
  });
});

describe("monthsBetween", () => {
  it("counts both ends, matching LinkedIn", () => {
    expect(monthsBetween("2024-06", "2025-05")).toBe(12);
    expect(monthsBetween("2015-07", "2022-09")).toBe(87);
    expect(monthsBetween("2025-07", "2026-09")).toBe(15);
  });

  it("never returns less than one month", () => {
    expect(monthsBetween("2025-07", "2025-07")).toBe(1);
    expect(monthsBetween("2025-08", "2025-07")).toBe(1);
  });
});

describe("formatDuration", () => {
  it("formats years and months", () => {
    expect(formatDuration(15)).toBe("1 yr 3 mos");
    expect(formatDuration(87)).toBe("7 yrs 3 mos");
    expect(formatDuration(25)).toBe("2 yrs 1 mo");
  });

  it("omits the empty part", () => {
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(24)).toBe("2 yrs");
    expect(formatDuration(1)).toBe("1 mo");
    expect(formatDuration(11)).toBe("11 mos");
  });

  it("falls back to months when zero", () => {
    expect(formatDuration(0)).toBe("0 mos");
  });
});

describe("formatYearMonthRangeDuration", () => {
  it("uses the current month for open-ended ranges", () => {
    expect(
      formatYearMonthRangeDuration("2025-07", null, new Date(2026, 8, 6)),
    ).toBe("1 yr 3 mos");
  });

  it("uses the end month for closed ranges", () => {
    expect(formatYearMonthRangeDuration("2022-10", "2024-05")).toBe(
      "1 yr 8 mos",
    );
  });
});

describe("isFutureYearMonth", () => {
  it("compares against the current month", () => {
    const now = new Date(2026, 8, 6);
    expect(isFutureYearMonth("2026-12", now)).toBe(true);
    expect(isFutureYearMonth("2026-09", now)).toBe(false);
    expect(isFutureYearMonth("2023-02", now)).toBe(false);
  });
});
