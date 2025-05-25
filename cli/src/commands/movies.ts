import { MOVIES_PATH } from "@lib/movies/movies";
import {
  MAX_MOVIE_STARS,
  Movie,
  movieSchema,
  PLATFORMS,
} from "@lib/movies/types";
import { Command } from "commander";
import fs from "fs";
import inquirer from "inquirer";

const moviesCommand = new Command("movies").description(
  "Movies related commands",
);

// Add subcommand
moviesCommand
  .command("add")
  .description("Add a new movie")
  .action(async () => {
    try {
      console.log("🎬 Add a new movie to your collection\n");

      const answers = await inquirer.prompt<Movie>([
        {
          type: "input",
          name: "title",
          message: "What's the name of the movie/series?",
        },
        {
          type: "number",
          name: "year",
          message: "What year was it released?",
        },
        {
          type: "input",
          name: "watchedAt",
          message: "When did you watch it? (MM/YYYY format):",
        },
        {
          type: "list",
          name: "platform",
          message: "Which platform did you watch it on?",
          choices: PLATFORMS,
        },
        {
          type: "list",
          name: "stars",
          message: "How many stars would you give it? (1-5)",
          choices: () => {
            return Array.from({ length: MAX_MOVIE_STARS }, (_, i) => ({
              name: `${"⭐".repeat(i + 1)} ${i + 1} star${i > 0 ? "s" : ""}`,
              value: i + 1,
            }));
          },
        },
      ]);

      // Validate schema
      const newMovie = movieSchema.parse(answers);

      // Push to file in MOVIES_PATH constant
      if (!fs.existsSync(MOVIES_PATH)) {
        fs.writeFileSync(MOVIES_PATH, JSON.stringify([]));
      }

      const moviesData = JSON.parse(fs.readFileSync(MOVIES_PATH, "utf-8"));

      moviesData.push(newMovie);
      fs.writeFileSync(MOVIES_PATH, JSON.stringify(moviesData, null, 2));

      console.log("\n✅ Movie added successfully!");
      console.log(`📽️  ${newMovie.title}`);
      console.log(`📅 Watched: ${answers.watchedAt}`);
      console.log(`📺 Platform: ${newMovie.platform}`);
      console.log(`⭐ Rating: ${newMovie.stars}/5 stars`);
    } catch (error) {
      console.error("❌ Error adding movie:", error);
      process.exit(1);
    }
  });

export { moviesCommand };
