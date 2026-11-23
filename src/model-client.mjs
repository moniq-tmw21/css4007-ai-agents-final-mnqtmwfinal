import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.LLM_API_KEY;
const model = process.env.LLM_MODEL || "gemini-3.8-flash";

export async function complete(messages, tools = []) {
  if (!apiKey) {
    throw new Error("LLM_API_KEY is missing. Check your .env file.");
  }

  if (tools.length > 0) {
    throw new Error("This Level D app does not use tools.");
  }

  const systemInstruction = messages
    .filter(
      (message) =>
        typeof message !== "string" && message.role === "system",
    )
    .map((message) => message.content || "")
    .join("\n\n");

  const input = messages
    .filter(
      (message) =>
        typeof message === "string" || message.role !== "system",
    )
    .map((message) => {
      if (typeof message === "string") return message;
      return `${message.role || "user"}: ${message.content || ""}`;
    })
    .join("\n\n");

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.interactions.create({
    model,
    input,
    ...(systemInstruction
      ? { system_instruction: systemInstruction }
      : {}),
  });

  return {
    text: response.output_text || "",
    toolCalls: [],
  };
}