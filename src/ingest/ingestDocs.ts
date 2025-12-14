import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

let documents: Document[] = [];

export async function ingestText(text: string) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid text input");
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  documents = await splitter.createDocuments([text]);
}

export function getDocuments() {
  if (documents.length === 0) {
    throw new Error("No documents ingested yet");
  }
  return documents;
}
