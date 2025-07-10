#!/usr/bin/env node

import { Command } from "commander";
import { scanCommand } from "../src/scanner.js";
import { fixCommand } from "../src/fixer.js";

const program = new Command();

program
  .name("env-check")
  .description("Validate and fix .env files based on code usage")
  .version("0.1.0");

program
  .command("scan")
  .description("Scan code for used env vars and compare with .env")
  .option("-f, --folder <path>", "folder to scan", "src")
  .option("-e, --env <file>", "env file path", ".env")
  .option("-o, --output-format <format>", "output format: text | json", "text")
  .action(scanCommand);

program
  .command("fix")
  .description("Add missing env vars from code into .env file")
  .option("-f, --folder <path>", "folder to scan", "src")
  .option("-e, --env <file>", "env file path", ".env")
  .action(fixCommand);

program.parse();
