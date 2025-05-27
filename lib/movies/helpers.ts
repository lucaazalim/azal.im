import { distance } from "fastest-levenshtein";
import fs from "fs";
import { z } from "zod";
import {
  Movie,
  MovieMetadata,
  movieMetadataSchema,
  movieSchema,
} from "./types";

export function loadRawMetadata(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Metadata file not found at ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export function loadMetadata(filePath: string): MovieMetadata[] {
  const json = loadRawMetadata(filePath);
  return z.array(movieMetadataSchema).parse(json);
}

export function saveMetadata(filePath: string, data: MovieMetadata[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Metadata saved to metadata.json");
}

export function isMetadataEntryValid(entry: any): entry is MovieMetadata {
  return movieMetadataSchema.safeParse(entry).success;
}

export function cleanInvalidMetadataEntries(metadata: any[]): MovieMetadata[] {
  return metadata
    .filter(isMetadataEntryValid)
    .map((entry) => movieMetadataSchema.parse(entry));
}

export function loadMovies(filePath: string): Movie[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Movies file not found at ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(content);
  return z.array(movieSchema).parse(json);
}

export function compareMovieTitles(title1: string, title2: string): boolean {
  const normalizedTitle1 = title1.trim().toLowerCase();
  const normalizedTitle2 = title2.trim().toLowerCase();

  const maxLength = Math.max(normalizedTitle1.length, normalizedTitle2.length);
  if (maxLength === 0) return true;

  const similarity =
    1 - distance(normalizedTitle1, normalizedTitle2) / maxLength;

  return similarity >= 0.8;
}

export function compareMovieYears(year1: number, year2: number): boolean {
  return Math.abs(year1 - year2) <= 1;
}

export function findMovieMetadata(
  movie: Movie,
  metadata: MovieMetadata[],
): MovieMetadata | undefined {
  return metadata.find((entry) => {
    const titlesMatch =
      compareMovieTitles(entry.title, movie.title) ||
      compareMovieTitles(entry.original_title, movie.title);

    const yearsMatch = compareMovieYears(
      Number(entry.release_date.getFullYear()),
      movie.year,
    );

    return titlesMatch && yearsMatch;
  });
}
