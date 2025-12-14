import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { retrieverTool } from "../tools/retrieverTool";
import { BaseMessage } from "@langchain/core/messages";
import { summarizeTool } from "../tools/summarizeTool";
import { explainTool } from "../tools/explainTool";
import { intentTool } from "../tools/intentTool";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export async function runAgent(message: string): Promise<string> {
  const agent = createAgent({
    model,
    tools: [retrieverTool,summarizeTool,explainTool,intentTool],
  });

  const result = await agent.invoke({
    messages: [
      {
        role: "system",
        content: `
  You are an intelligent AI agent designed to answer user questions
  by reasoning step-by-step and using tools when needed.

  Rules:
  - Use tools only when they help answer the question.
  - Prefer retrieved knowledge over assumptions.
  - If information is missing, say so clearly.
  - Keep responses concise and professional.
        `,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const messages = result.messages as BaseMessage[];

  const lastMessage = messages[messages.length - 1];

  if (typeof lastMessage?.content === "string") {
    return lastMessage.content;
  }

  return JSON.stringify(lastMessage?.content);
}
