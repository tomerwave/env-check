import dotenv from "dotenv";

export function loadDefinedEnvVars(envPath) {
  const result = dotenv.config({ path: envPath });
  // dotenv returns { parsed: {...} } on success, undefined on fail
  return new Set(result.parsed ? Object.keys(result.parsed) : []);
}
