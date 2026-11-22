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

  const input = messages
    .map((message) => {
      if (typeof message === "string") return message;
      return `${message.role || "user"}: ${message.content || ""}`;
    })
    .join("\n\n");

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.interactions.create({ model, input });

  return {
    text: response.output_text || "",
    toolCalls: [],
  };
}