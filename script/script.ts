import chalk from "chalk";
import fs from "fs";
import path from "path";
import { z } from "zod";

const filePath = path.join(__dirname, "movies.json");
const metadataFilePath = path.join(__dirname, "metadata.json");
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_MOVIE_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
const TMDB_TV_URL =
  "https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1";

const MovieSchema = z.object({
  watched_at: z.string().optional(), // Date in MM-YYYY format
  title: z.string().optional(),
  platform: z.string().optional(),
  type: z.enum(["movie", "series", "documentary", "miniseries"]).optional(),
  year: z.string(),
  recommended: z.enum(["yes", "no", "maybe", "favorite"]).optional(),
});

const MoviesArraySchema = z.array(MovieSchema);

type Movie = z.infer<typeof MovieSchema>;

interface MetadataEntry {
  title: string;
  year: string;
  data: {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
  };
}

// Utility function to read or initialize metadata
function loadMetadata(filePath: string): MetadataEntry[] {
  if (!fs.existsSync(filePath)) {
    console.log("metadata.json does not exist. Creating a new file.");
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return content ? JSON.parse(content) : [];
}

// Utility function to save metadata
function saveMetadata(filePath: string, metadata: MetadataEntry[]): void {
  fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));
  console.log("Metadata saved to metadata.json");
}

// Utility function to fetch metadata from TMDB
async function fetchFromTMDB(movie: Movie): Promise<MetadataEntry | null> {
  const title = movie.title || "";
  const year = movie.year || "";

  const url =
    movie.type === "movie"
      ? `${TMDB_MOVIE_URL}&query=${encodeURIComponent(title)}&year=${year}`
      : `${TMDB_TV_URL}&query=${encodeURIComponent(title)}&first_air_date_year=${year}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return {
      title,
      year,
      data: data.results[0],
    };
  } else {
    console.log(chalk.red(`No results found for ${title}.`));
    return null;
  }
}

async function fetchMovieMetadata() {
  const rawMovies = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Validate movies.json using Zod array schema
  let movies: Movie[];
  try {
    movies = MoviesArraySchema.parse(rawMovies);
  } catch (error) {
    console.error("Validation failed for movies.json:", error);
    throw new Error("Invalid movies.json file");
  }

  const metadata: MetadataEntry[] = loadMetadata(metadataFilePath);

  for (const [index, movie] of movies.entries()) {
    if (!movie.title) continue;

    const cachedData = metadata.find(
      (entry) => entry.title === movie.title && entry.year === movie.year
    );

    if (cachedData) {
      console.log(`Using cached metadata for ${movie.title}.`);
      continue;
    }

    try {
      console.log(
        `Fetching metadata for movie ${index + 1}/${movies.length}: ${movie.title}`
      );
      const newEntry = await fetchFromTMDB(movie);
      if (newEntry) {
        metadata.push(newEntry);
        saveMetadata(metadataFilePath, metadata);
        console.log(`Metadata for ${movie.title} saved.`);

        // Add a delay to ensure no more than 50 requests per second
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    } catch (error) {
      console.error(`Failed to fetch metadata for ${movie.title}:`, error);
    }
  }

  console.log("All metadata has been fetched and saved.");
}

fetchMovieMetadata();
