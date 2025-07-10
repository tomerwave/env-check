import fs from "fs/promises";
import chalk from "chalk";
import { extractUsedEnvVars } from "./extract-used-env-vars.js";
import { loadDefinedEnvVars } from "./load-defined-env-vars.js";
import { logResults } from "./logger.js";

export async function fixCommand(options) {
  const folder = options.folder || "src";
  const envPath = options.env || ".env";

  const usedVars = await extractUsedEnvVars(folder);
  const definedVars = loadDefinedEnvVars(envPath);

  const missingInEnv = [...usedVars].filter((v) => !definedVars.has(v));
  const unusedInCode = [...definedVars].filter((v) => !usedVars.has(v));

  if (missingInEnv.length === 0) {
    console.log(
      chalk.green("✅ No missing environment variables, .env is up to date.")
    );
    return;
  }

  // Append missing vars at the end of .env
  const lines = missingInEnv.map((v) => `${v}=`);
  await fs.appendFile(envPath, `\n${lines.join("\n")}\n`);
  console.log(
    chalk.green(`✅ Added ${missingInEnv.length} variable(s) to ${envPath}:`)
  );
  lines.forEach((l) => console.log(chalk.blue("  " + l)));

  // Optionally show unused
  logResults({ missingInEnv: [], unusedInCode });
}
