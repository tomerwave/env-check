# env-check

A CLI tool to scan, compare, and fix environment variables in Node.js projects.

## Overview

`env-check` helps you manage your project's environment variables by:

- Scanning your codebase for all used environment variables (from `process.env`, `import.meta.env`, and `Bun.env`).
- Loading all variables defined in your `.env` file.
- Comparing used vs. defined variables to find missing, unused, or inconsistent entries.
- (Planned) Automatically fixing or suggesting fixes for your `.env` file.

## Features

- **Scan**: Find all environment variables referenced in your JS/TS code.
- **Parse**: Read and parse your `.env` file.
- **Compare**: Highlight missing or unused variables.
- **Fix**: Add missing environment variables to your `.env` file.
- **CLI**: Easy to use from the command line.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tomerwave/env-check.git
cd env-check
npm install
```

## Usage

You can run the CLI directly:

```bash
node ./bin/cli.js scan <project-folder>
```

Or, if you link it globally:

```bash
npm link
env-check scan <project-folder>
```

## Example

```bash
env-check scan ./my-app
```

This will scan all JS/TS files in `./my-app` for environment variable usage and compare them to the variables defined in `.env`.

## Project Structure

- `bin/cli.js` - CLI entry point
- `src/scanner.js` - Scans codebase for env usage
- `src/fixer.js` - Adds missing environment variables to .env
- `src/logger.js` - Logging utilities
- `tests/` - Unit tests

## Development

- Node.js 16+ required
- ESM support (`type: module` in `package.json`)
- Tests use [Jest](https://jestjs.io/) (with ESM support)

### Running Tests

```bash
npm test
```

### Adding Features

Pull requests are welcome! Please open an issue first to discuss major changes.

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -am 'Add foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a pull request

## License

MIT
