import test from "node:test";
import assert from "node:assert/strict";
import {
  validateInput,
  buildStudyPrompt,
  validateStudyGuide,
} from "../src/study-guide.mjs";

const validGuide = `### Summary
Plants use photosynthesis to make food.

### Practice Questions
1. What process do plants use to make food?
2. What does glucose give to the plant?
3. What gas do plants release?

### Answer Key
1. Photosynthesis.
2. Energy.
3. Oxygen.`;

test("accepts and trims study material", () => {
  assert.equal(validateInput("  Photosynthesis notes  "), "Photosynthesis notes");
});

test("rejects empty study material", () => {
  assert.throws(() => validateInput("  "), /Please enter some study material/);
});

test("includes the study material in the AI prompt", () => {
  const prompt = buildStudyPrompt("Notes about photosynthesis");

  assert.equal(prompt[0].role, "user");
  assert.ok(prompt[0].content.includes("Notes about photosynthesis"));
});

test("accepts a complete study guide", () => {
  assert.equal(validateStudyGuide(validGuide), validGuide);
});

test("rejects an empty AI response", () => {
  assert.throws(() => validateStudyGuide(" "), /empty response/i);
});

test("rejects a response with fewer than three questions", () => {
  const guideWithTwoQuestions = `### Summary
Plants use photosynthesis.

### Practice Questions
1. What process do plants use?
2. What do plants produce?

### Answer Key
1. Photosynthesis.
2. Glucose and oxygen.`;

  assert.throws(
    () => validateStudyGuide(guideWithTwoQuestions),
    /at least three questions/i,
  );
});

test("rejects a response without a summary", () => {
  const guideWithoutSummary = `### Practice Questions
1. Question one?
2. Question two?
3. Question three?

### Answer Key
1. Answer one.
2. Answer two.
3. Answer three.`;

  assert.throws(
    () => validateStudyGuide(guideWithoutSummary),
    /missing the Summary section/i,
  );
});

test("rejects a response without an answer key", () => {
  const guideWithoutAnswerKey = `### Summary
Plants use photosynthesis.

### Practice Questions
1. Question one?
2. Question two?
3. Question three?`;

  assert.throws(
    () => validateStudyGuide(guideWithoutAnswerKey),
    /missing the Answer Key section/i,
  );
});