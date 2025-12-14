import { tool } from "langchain";
import { z } from "zod";
import { logTool } from "../utils/logger";

const schema = z.object({
  message: z.string(),
});

export const intentTool = tool(
  async (input) => {
    logTool("classify_intent", input);

    const { message } = schema.parse(input);

    if (message.toLowerCase().includes("summarize")) {
      return "Intent: Summarization";
    }

    if (message.toLowerCase().includes("search")) {
      return "Intent: Knowledge Retrieval";
    }

    if (message.toLowerCase().includes("why") || message.toLowerCase().includes("explain")) {
      return "Intent: Explanation";
    }

    return "Intent: General Question";
  },
  {
    name: "classify_intent",
    description: "Classify the user's intent to guide agent behavior",
    schema,
  }
);
