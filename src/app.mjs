import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { generateStudyGuide } from "./study-guide.mjs";

const terminal = createInterface({
  input: stdin,
  output: stdout,
  crlfDelay: Infinity,
});

console.log("Paste your study material below.");
console.log("When you're done, type END on a new line and press Enter.");

const lines = [];

try {
  for await (const line of terminal) {
    if (line.trim().toUpperCase() === "END") {
      break;
    }

    lines.push(line);
  }

  const studyMaterial = lines.join("\n");
  const studyGuide = await generateStudyGuide(studyMaterial);

  console.log("\n--- Your StudyBuddy Guide ---\n");
  console.log(studyGuide);
} catch (error) {
  console.error(`\nStudyBuddy couldn't create a guide: ${error.message}`);
} finally {
  terminal.close();
}