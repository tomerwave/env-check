import chalk from "chalk";

export function logResults({ missingInEnv, unusedInCode }, format = "text") {
  switch (format) {
    case "json":
      logJson({ missingInEnv, unusedInCode });
      break;
    case "text":
    default:
      console.log(
        chalk.yellow("Output format not supported. Defaulting to text.")
      );
      logText({ missingInEnv, unusedInCode });
      break;
  }
}

function logJson({ missingInEnv, unusedInCode }) {
  console.log(JSON.stringify({ missingInEnv, unusedInCode }, null, 2));
}

function logText({ missingInEnv, unusedInCode }) {
  if (missingInEnv.length === 0) {
    console.log(
      chalk.green("✅ All used environment variables are defined in .env.")
    );
  } else {
    console.log(chalk.red("❌ Missing in .env (used in code, not in .env):"));
    for (const v of missingInEnv) {
      console.log("  " + chalk.redBright("- " + v));
    }
  }

  if (unusedInCode.length === 0) {
    console.log(chalk.green("✅ All variables in .env are used in code."));
  } else {
    console.log(
      chalk.yellow("⚠️  Unused in code (exist in .env, not in code):")
    );
    for (const v of unusedInCode) {
      console.log("  " + chalk.yellowBright("- " + v));
    }
  }
}
