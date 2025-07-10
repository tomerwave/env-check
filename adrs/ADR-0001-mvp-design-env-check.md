# **ADR-0001 - MVP Design for env-check CLI Tool**

**Status:** Accepted
**Author**: @tomerwave
**Date**: 2025-07-10

## Context

Managing environment variables is often error-prone. Developers forget to define variables used in code, or carry unused ones in their `.env` files. We want a simple, powerful CLI tool that detects and fixes this.

Many existing tools focus on syntax (`dotenv-linter`), runtime validation (`check-env`), or schema enforcement. Few focus on statically scanning the codebase to compare what is actually _used_ vs _defined_ in `.env`. Our tool aims to fill this gap.

## MVP Goals

Create a CLI tool named `env-check` with the following capabilities:

### 1. `--scan` Mode

- **Purpose**: List all environment variables that are used in code but missing from the `.env` file.
- **Inputs**:

  - `--folder [dir]` (default: `src`): directory to recursively scan
  - `--env [file]` (default: `.env`): path to .env file
  - `--output-format [text|json]` (default: `text`): choose output format

- **Outputs**:

  - List (or JSON array) of missing environment variables

### 2. `--fix` Mode

- **Purpose**: Adds missing env vars to `.env` or a specified file.
- **Inputs**:

  - Same as `--scan`

- **Outputs**:

  - Updated .env file with missing variables added (as `KEY=`)

### 3. `--help`

- **Purpose**: Provide help text for the CLI.
- **Supports**:

  - `env-check --help`
  - `env-check --help scan`
  - `env-check --help fix`

## Language & Tools

### Language

- **Node.js (ESM)**: Portable, fast to build CLI tooling, many users in the target community.

### Libraries

- `commander`: CLI argument parsing
- `dotenv`: Load and parse .env files
- `fs/promises`: File read/write
- `glob`: Recursively find source files
- `acorn` or `recast`: Parse JS/TS source for `process.env.X`
- (Optional) `chalk`: For colored output in text mode

## Project Structure

```
env-check/
├── bin/
│   └── cli.js              # Entrypoint for CLI
├── src/
│   ├── scanner.js          # Scans codebase for process.env usage
│   ├── parser.js           # Extracts env var names from code files
│   ├── comparer.js         # Compares used vs defined
│   ├── fixer.js            # Applies missing vars to env file
│   └── logger.js           # Handles output formatting (JSON/text)
├── tests/                  # Unit tests
├── .env                    # Sample test file
├── package.json
├── README.md
└── .gitignore
```

## Future Considerations

- Python support (e.g., `os.getenv`)
- Lint mode that fails CI on missing vars
- GitHub Action integration
- `.env.example` generation
- AI-based suggestions for docstrings or comments

## Decision

We will proceed with the above MVP spec and implementation in Node.js using the listed tools. The CLI will be self-contained, easily installable via `npx`, and designed for open-source usage from the beginning.
