import { tool } from "langchain";
import { z } from "zod";
import { logTool } from "../utils/logger";

const schema = z.object({
  text: z.string(),
});

export const summarizeTool = tool(
  async (input) => {
    logTool("summarize_text", input);

    const { text } = schema.parse(input);

    return `Summary:\n${text
      .split(".")
      .slice(0, 3)
      .join(".")}.`;
  },
  {
    name: "summarize_text",
    description: "Summarize a given block of text",
    schema,
  }
);
