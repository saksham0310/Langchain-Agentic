import express from "express";
import "dotenv/config";
import { ingestText } from "./ingest/ingestDocs";
import chatRouter from "./api/chat";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("LangChain Agentic Project is running 🚀");
});

app.use("/api", chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
