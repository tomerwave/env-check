import { glob } from "glob";
import fs from "fs/promises";

export async function extractUsedEnvVars(folder) {
  const files = await glob(`${folder}/**/*.{js,ts}`, { absolute: true });

  // All supported access patterns
  const regexes = [
    /process\.env\.([a-zA-Z0-9_]+)/g, // Node.js, Bun (process)
    /import\.meta\.env\.([a-zA-Z0-9_]+)/g, // Vite, Bun (import.meta)
    /Bun\.env\.([a-zA-Z0-9_]+)/g, // Bun (Bun.env)
  ];

  const vars = new Set();

  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    for (const regex of regexes) {
      let match;
      while ((match = regex.exec(content))) {
        vars.add(match[1]);
      }
    }
  }

  return vars;
}
