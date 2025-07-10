import { extractUsedEnvVars } from "../src/extract-used-env-vars.js";
import fs from "fs/promises";
import path from "path";

describe("extractUsedEnvVars", () => {
  const fixturesDir = "tests/fixtures";

  beforeAll(async () => {
    // Ensure fixtures exist (if you want to dynamically create for test)
    await fs.mkdir(fixturesDir, { recursive: true });
    await fs.writeFile(
      path.join(fixturesDir, "node_env.js"),
      "const a = process.env.NODE_TOKEN;"
    );
    await fs.writeFile(
      path.join(fixturesDir, "vite_env.js"),
      "if (import.meta.env.VITE_API_KEY) console.log(import.meta.env.VITE_API_KEY);"
    );
    await fs.writeFile(
      path.join(fixturesDir, "bun_env.ts"),
      "const x = Bun.env.BUN_SECRET;"
    );
    await fs.writeFile(
      path.join(fixturesDir, "multiple_envs.js"),
      `
      const a = process.env.A;
      const b = import.meta.env.B;
      const c = Bun.env.C;
    `
    );
  });

  afterAll(async () => {
    // Cleanup if you want
    const files = [
      "node_env.js",
      "vite_env.js",
      "bun_env.ts",
      "multiple_envs.js",
    ];
    for (const file of files) {
      await fs.unlink(path.join(fixturesDir, file));
    }
    await fs.rmdir(fixturesDir);
  });

  test("finds env vars in all supported patterns", async () => {
    const vars = await extractUsedEnvVars(fixturesDir);
    expect(vars).toEqual(
      new Set([
        "NODE_TOKEN", // from node_env.js
        "VITE_API_KEY", // from vite_env.js
        "BUN_SECRET", // from bun_env.ts
        "A",
        "B",
        "C", // from multiple_envs.js
      ])
    );
  });

  test("returns empty set for empty folder", async () => {
    const emptyDir = path.join(fixturesDir, "empty");
    await fs.mkdir(emptyDir, { recursive: true });

    const vars = await extractUsedEnvVars(emptyDir);
    expect(vars.size).toBe(0);

    await fs.rmdir(emptyDir);
  });
});
