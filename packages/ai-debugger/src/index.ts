import OpenAI from "openai";
import chalk from "chalk";
import * as fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeLogs(logFilePath: string) {
  const content = fs.readFileSync(logFilePath, "utf8");

  console.log(chalk.cyan("🔍 Analyzing logs with AI..."));

  const prompt = `
You are a debugging assistant for WalletConnect developers.
Analyze the following logs and explain:
1. What went wrong (if anything)
2. Possible cause
3. Suggest one fix

Logs:
${content.slice(0, 4000)}
`;

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  console.log(chalk.green("\n🧠 AI Analysis:\n"));
  console.log(response.output_text);
}

if (require.main === module) {
  const file = process.argv[2];
  if (!file) {
    console.error(chalk.red("Please provide a log file path."));
    process.exit(1);
  }
  analyzeLogs(file);
}
