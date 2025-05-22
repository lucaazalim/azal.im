import metadataJson from "@/data/shows/metadata.json";
import showsJson from "@/data/shows/shows.json";
import { distance } from "fastest-levenshtein";
import { z } from "zod";
import {
  PaginatedRequest,
  PaginatedResponse,
  Show,
  ShowMetadata,
  showSchema,
  ShowWithMetadata,
} from "./types";

let shows: Show[] = z.array(showSchema).parse(showsJson);
let metadata: ShowMetadata[] = metadataJson;
let showsWithMetadata: ShowWithMetadata[] = shows
  .map((show) => {
    const metadataEntry = findMetadataFromShow(show, metadata);
    if (metadataEntry) return { ...show, metadata: metadataEntry };
  })
  .filter((show) => show !== undefined)
  .sort(
    (a, b) => (b.watched_at?.getTime() ?? 0) - (a.watched_at?.getTime() ?? 0)
  );

shows = undefined as any;
metadata = undefined as any;

export function getShows({
  cursor,
  limit,
}: PaginatedRequest): PaginatedResponse<ShowWithMetadata> {
  return {
    data: showsWithMetadata.slice(cursor, cursor + limit),
    nextCursor: cursor + limit,
    hasMore: cursor + limit < showsWithMetadata.length,
  };
}

function compareShowTitles(title1: string, title2: string): boolean {
  const normalizedTitle1 = title1.trim().toLowerCase();
  const normalizedTitle2 = title2.trim().toLowerCase();

  const maxLength = Math.max(normalizedTitle1.length, normalizedTitle2.length);
  if (maxLength === 0) return true;

  const similarity =
    1 - distance(normalizedTitle1, normalizedTitle2) / maxLength;

  return similarity >= 0.8;
}

function compareShowYears(year1: number, year2: number): boolean {
  return Math.abs(year1 - year2) <= 1;
}

function findMetadataFromShow(
  show: Show,
  metadata: ShowMetadata[]
): ShowMetadata | undefined {
  return metadata.find((entry) => {
    const titlesMatch =
      compareShowTitles(entry.title, show.title) ||
      compareShowTitles(entry.original_title, show.title);

    const yearsMatch = compareShowYears(
      Number(entry.release_date.split("-")[0]), // extract year
      show.year
    );

    return titlesMatch && yearsMatch;
  });
}
