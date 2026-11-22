import { complete } from "./model-client.mjs";

export function validateInput(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("Please enter some study material.");
  }

  return text.trim();
}

export function buildStudyPrompt(text) {
  return [
    {
      role: "user",
      content: `You are StudyBuddy, a helpful study partner.
Use only the study material below. Do not add facts that are not in it.
Write the result with these sections:
### Summary
### Practice Questions
Write at least three numbered questions.
### Answer Key
Give an answer for each question.

Study material:
${text}`,
    },
  ];
}

export function validateStudyGuide(text) {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("The AI returned an empty response.");
  }

  if (!/^### Summary/im.test(text)) {
    throw new Error("The AI response is missing the Summary section.");
  }

  const questionSection = text.match(
    /### Practice Questions\s*([\s\S]*?)(?=### Answer Key|$)/i,
  )?.[1] ?? "";

  const questions = questionSection.match(/^\s*\d+[.)]\s+/gm) ?? [];

  if (questions.length < 3) {
    throw new Error("The AI response must include at least three questions.");
  }

  if (!/### Answer Key/i.test(text)) {
    throw new Error("The AI response is missing the Answer Key section.");
  }

  return text.trim();
}

export async function generateStudyGuide(text) {
  const studyMaterial = validateInput(text);
  const response = await complete(buildStudyPrompt(studyMaterial));

  return validateStudyGuide(response.text);
}