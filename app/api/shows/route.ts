import { getShows } from "@/lib/shows/shows";
import { showFilterSchema } from "@/lib/shows/types";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const cursor = Number(searchParams.get("cursor")) || 0;
  const limit = Number(searchParams.get("limit")) || 10;

  const filters = {
    title: searchParams.get("title") || undefined,
    recommended: searchParams.get("recommended") || undefined,
    genre: searchParams.get("genre") || undefined,
  };

  const filtersParseResult = showFilterSchema.safeParse(filters);

  if (!filtersParseResult.success) {
    return NextResponse.json(
      {
        error: "Invalid filters",
        issues: filtersParseResult.error.format(),
      },
      { status: 400 },
    );
  }

  const shows = getShows({
    cursor,
    limit,
    filters: filtersParseResult.data,
  });

  return NextResponse.json(shows, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
