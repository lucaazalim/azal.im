import { getShows } from "@/lib/shows/shows";
import { showsRequestSchema } from "@/lib/shows/types";
import { searchParamsToObject } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = searchParamsToObject(request.nextUrl.searchParams);
  const showsRequest = showsRequestSchema.safeParse(searchParams);

  if (!showsRequest.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        issues: showsRequest.error.format(),
      },
      { status: 400 },
    );
  }

  const shows = getShows(showsRequest.data);

  return NextResponse.json(shows, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
