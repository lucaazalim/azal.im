import { getShows } from "@/lib/shows/shows";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const cursor = Number(searchParams.get("cursor")) || 0;
  const limit = Number(searchParams.get("limit")) || 10;
  const title = searchParams.get("title") || undefined;
  const recommended = searchParams.get("recommended") || undefined;
  const genre = searchParams.get("genres") || undefined;

  const shows = getShows({
    cursor,
    limit,
    filters: {
      title,
      recommended,
      genre,
    },
  });

  return NextResponse.json(shows, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
