import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { retrieverTool } from "../tools/retrieverTool";
import { BaseMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export async function runAgent(message: string): Promise<string> {
  const agent = createAgent({
    model,
    tools: [retrieverTool],
  });

  const result = await agent.invoke({
    messages: [
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
