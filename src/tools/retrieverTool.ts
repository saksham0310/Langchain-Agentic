import { tool } from "langchain";
import { z } from "zod";
import { getDocuments } from "../ingest/ingestDocs";
import { logTool } from "../utils/logger";

const schema = z.object({
  query: z.string(),
});

export const retrieverTool = tool(
  async (input) => {
    logTool("retrieverTool", input);

    const { query } = schema.parse(input);

    const docs = getDocuments();

    const results = docs.filter(doc =>
      doc.pageContent.toLowerCase().includes(query.toLowerCase())
    );

    return results
      .slice(0, 4)
      .map(d => d.pageContent)
      .join("\n");
  },
  {
    name: "knowledge_search",
    description: "Search ingested documents for relevant information",
    schema,
  }
);
