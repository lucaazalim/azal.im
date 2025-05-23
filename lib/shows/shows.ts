import { distance } from "fastest-levenshtein";
import fs from "fs";
import { z } from "zod";
import { PaginatedResponse } from "../types";
import {
  Show,
  ShowMetadata,
  showSchema,
  ShowsRequest,
  ShowWithMetadata,
} from "./types";

const SHOWS_PATH = "./data/shows/shows.json";
const METADATA_PATH = "./data/shows/metadata.json";

let showsWithMetadata: ShowWithMetadata[];
let genres: string[] = [];

function loadShowData() {
  const showsRawData = fs.readFileSync(SHOWS_PATH, "utf-8");
  const showsJson = JSON.parse(showsRawData);
  const shows = z.array(showSchema).parse(showsJson);

  const metadataRawData = fs.readFileSync(METADATA_PATH, "utf-8");
  const metadata = JSON.parse(metadataRawData);

  showsWithMetadata = shows
    .map((show) => {
      const metadataEntry = findMetadataFromShow(show, metadata);
      if (metadataEntry) return { ...show, metadata: metadataEntry };
    })
    .filter((show) => show !== undefined)
    .sort(
      (a, b) => (b.watched_at?.getTime() ?? 0) - (a.watched_at?.getTime() ?? 0),
    );

  genres = showsWithMetadata
    .flatMap((show) => show.metadata.genres)
    .filter((genre, index, self) => self.indexOf(genre) === index)
    .sort((a, b) => a.localeCompare(b));
}

loadShowData();

export function getShows({
  cursor,
  limit = 10,
  title,
  stars,
  genre,
}: ShowsRequest): PaginatedResponse<ShowWithMetadata> {
  let filteredShows = [...showsWithMetadata];

  if (title) {
    const searchTitle = title.toLowerCase();
    filteredShows = filteredShows.filter((show) =>
      show.title.toLowerCase().includes(searchTitle),
    );
  }

  if (stars) {
    filteredShows = filteredShows.filter((show) => show.stars === stars);
  }

  if (genre) {
    filteredShows = filteredShows.filter((show) =>
      show.metadata.genres.includes(genre),
    );
  }

  return {
    data: filteredShows.slice(cursor, cursor + limit),
    nextCursor: Math.min(cursor + limit, filteredShows.length),
    hasMore: cursor + limit < filteredShows.length,
  };
}

export function getGenres(): string[] {
  return genres;
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
  metadata: ShowMetadata[],
): ShowMetadata | undefined {
  return metadata.find((entry) => {
    const titlesMatch =
      compareShowTitles(entry.title, show.title) ||
      compareShowTitles(entry.original_title, show.title);

    const yearsMatch = compareShowYears(
      Number(entry.release_date.split("-")[0]), // extract year
      show.year,
    );

    return titlesMatch && yearsMatch;
  });
}

export default {
  getShows,
};
