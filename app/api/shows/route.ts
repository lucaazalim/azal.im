import { getShows } from "@/lib/shows/shows";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  console.log("Debug!");

  const searchParams = request.nextUrl.searchParams;

  const cursor = Number(searchParams.get("cursor")) || 0;
  const limit = Number(searchParams.get("limit")) || 10;

  const shows = getShows({
    cursor,
    limit,
  });

  return NextResponse.json(shows, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
