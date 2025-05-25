#!/usr/bin/env node

import { Command } from "commander";
import { moviesCommand } from "./commands/movies";

const program = new Command();

program
  .name("azalim")
  .description("A CLI application to manage azal.im data.")
  .version("1.0.0");

// Add the movies command
program.addCommand(moviesCommand);

program.parse();
