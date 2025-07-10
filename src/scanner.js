import { logResults } from "./logger.js";
import { extractUsedEnvVars } from "./extract-used-env-vars.js";
import { loadDefinedEnvVars } from "./load-defined-env-vars.js";

export async function scanCommand(options) {
  const folder = options.folder || "src";
  const envPath = options.env || ".env";
  const format = options.outputFormat || "text";

  // Get variables
  const usedVars = await extractUsedEnvVars(folder);
  const definedVars = loadDefinedEnvVars(envPath);

  // Compare sets
  const missingInEnv = [...usedVars].filter((v) => !definedVars.has(v));
  const unusedInCode = [...definedVars].filter((v) => !usedVars.has(v));

  logResults({ missingInEnv, unusedInCode }, format);
}
