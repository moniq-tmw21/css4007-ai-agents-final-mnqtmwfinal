import { complete } from "./model-client.mjs";

export function validateInput(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("Please enter some study material.");
  }

  return text.trim();
}

export function buildStudyPrompt(text) {
  const noteCount = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean).length;

  return [
    {
      role: "user",
      content: `Study material:
<study_material>
${text}
</study_material>`,
    },
    {
      role: "system",
      content: `You are StudyBuddy, a helpful study partner.

Create a study guide using only the user's study material.

Summary rules:
- Write the summary as bullet points.
- The material contains ${noteCount} non-empty lines. Write at least ${noteCount} summary bullets, keeping the same order as the material.
- Include the important fact or process stage from every line. Do not leave out middle steps.
- Keep the key terms from the material, such as the names of process stages.
- Before answering, compare each line of the material with the summary and check that it is represented.

Practice question rules:
- Write at least three numbered questions.
- Make each question cover a different important fact or process stage.
- Do not repeat the same question in different words.
- Give an answer for every question using only the material.
- Do not add outside facts or guess information.

Respond in the same language as the study material.
Use these headings exactly:

### Summary
### Practice Questions
### Answer Key`,
    },
  ];
}

export function validateStudyGuide(text, sourceMaterial = "") {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("The AI returned an empty response.");
  }

  if (!/^### Summary/im.test(text)) {
    throw new Error("The AI response is missing the Summary section.");
  }

  const questionSection =
    text.match(
      /### Practice Questions\s*([\s\S]*?)(?=### Answer Key|$)/i,
    )?.[1] ?? "";

  const questions = questionSection.match(/^\s*\d+[.)]\s+/gm) ?? [];

  if (questions.length < 3) {
    throw new Error("The AI response must include at least three questions.");
  }

  if (!/### Answer Key/i.test(text)) {
    throw new Error("The AI response is missing the Answer Key section.");
  }

  if (sourceMaterial) {
    const sourceLineCount = sourceMaterial
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean).length;

    const summarySection =
      text.match(
        /### Summary\s*([\s\S]*?)(?=### Practice Questions|$)/i,
      )?.[1] ?? "";

    const summaryBullets = summarySection.match(/^\s*[-*]\s+/gm) ?? [];

    if (summaryBullets.length < sourceLineCount) {
      throw new Error(
        `The summary may be missing some notes. It needs at least ${sourceLineCount} bullet points.`,
      );
    }
  }

  return text.trim();
}

export async function generateStudyGuide(text) {
  const studyMaterial = validateInput(text);
  const response = await complete(buildStudyPrompt(studyMaterial));

  return validateStudyGuide(response.text, studyMaterial);
}