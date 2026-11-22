import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { generateStudyGuide } from "./study-guide.mjs";

const terminal = createInterface({ input: stdin, output: stdout });

try {
  console.log("Paste your study material below.");
  console.log("When you're done, type END on a new line and press Enter.");

  const lines = [];

  while (true) {
    const line = await terminal.question("");
    if (line.trim().toUpperCase() === "END") break;
    lines.push(line);
  }

  const studyGuide = await generateStudyGuide(lines.join("\n"));

  console.log("\n--- Your StudyBuddy Guide ---\n");
  console.log(studyGuide);
} catch (error) {
  console.error(`\nStudyBuddy couldn't create a guide: ${error.message}`);
} finally {
  terminal.close();
}