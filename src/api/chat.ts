import express from "express";
import { runAgent } from "../agent/agent";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Request body must include a 'message' string",
      });
    }

    const response = await runAgent(message);

    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default router;
