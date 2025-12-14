import { tool } from "langchain";
import { z } from "zod";
import { logTool } from "../utils/logger";

const schema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const explainTool = tool(
  async (input) => {
    logTool("explain_reasoning", input);

    const { question, answer } = schema.parse(input);

    return `
I answered the question "${question}" by:
1. Understanding the user intent
2. Using tools when needed
3. Producing a concise response

Final answer:
${answer}
`;
  },
  {
    name: "explain_reasoning",
    description: "Explain how the agent produced an answer",
    schema,
  }
);
