import { getMovies } from "@/lib/movies/movies";
import { moviesRequestSchema } from "@/lib/movies/types";
import { searchParamsToObject } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const searchParams = searchParamsToObject(request.nextUrl.searchParams);
  const moviesRequest = moviesRequestSchema.safeParse(searchParams);

  if (!moviesRequest.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        issues: z.treeifyError(moviesRequest.error),
      },
      { status: 400 },
    );
  }

  const movies = getMovies(moviesRequest.data);

  return NextResponse.json(movies, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
