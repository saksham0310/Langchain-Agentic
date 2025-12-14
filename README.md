# LangChain Agentic AI Project

An **agentic AI backend** built using **LangChain (TypeScript)** that demonstrates **tool-based reasoning**, **retrieval-augmented generation (RAG)**, **intent classification**, **summarization**, and **self-explanation**.

---

## Features

* **Agentic AI** using LangChain `createAgent`
* **Multiple Tools** with structured schemas
* **Document Ingestion & Retrieval (RAG)**
* **Text Summarization**
* **Intent Classification**
* **Agent Self-Explanation (Reasoning Transparency)**
* **REST API** (Express.js)
* **Tool Invocation Logging**
* **Automation-Ready Architecture (n8n compatible)**

---

## Architecture Overview

```
Client / Automation Tool (n8n)
        |
        | HTTP Request
        v
Express API
        |
        v
LangChain Agent
  ├─ knowledge_search (retrieval)
  ├─ summarize_text
  ├─ classify_intent
  ├─ explain_reasoning
  └─ format_response
```

The agent dynamically decides **which tools to invoke** based on user intent and system instructions.

---

## Project Structure

```
src/
├── agent/
│   └── agent.ts            # Agent definition & execution
├── api/
│   └── chat.ts             # /api/chat endpoint
├── config/
│   └── openai.ts           # OpenAI & embedding configuration
├── ingest/
│   └── ingestDocs.ts       # Document ingestion & chunking
├── tools/
│   ├── retrieverTool.ts    # Knowledge search tool
│   ├── summarizeTool.ts    # Text summarization tool
│   ├── intentTool.ts       # Intent classification tool
│   ├── explainTool.ts      # Reasoning explanation tool
│   └── formatTool.ts       # Output formatting tool
├── utils/
│   └── logger.ts           # Tool invocation logging
└── index.ts                # App entry point
```

---

## Tools Implemented

| Tool Name           | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `knowledge_search`  | Retrieve relevant information from ingested documents |
| `summarize_text`    | Summarize long text inputs                            |
| `classify_intent`   | Detect user intent (search, summarize, explain, etc.) |
| `explain_reasoning` | Explain how the agent produced an answer              |
| `format_response`   | Format final output for user-facing responses         |

Each tool:

* Uses **Zod schemas**
* Is **type-safe**
* Logs invocation for observability

---

## API Endpoints

### 🔹 Health Check

```
GET /
```

### 🔹 Chat with Agent

```
POST /api/chat
Content-Type: application/json

{
  "message": "Search your knowledge about LangChain and summarize it"
}
```

---

## Example curl Commands


### Ask a Question

```bash
curl -X POST http://localhost:3000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"What does LangChain enable?\"}"
```

### Summarization

```bash
curl -X POST http://localhost:3000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"Summarize what you know about LangChain\"}"
```

---

## 🔍 Tool Invocation Logs (Example)

```
Tool Invoked: retrieverTool
Input: { "message": "What does LangChain enable?" }

Tool Invoked: explain_reasoning
{ "message": "Explain how you would answer the question: What does LangChain enable" }

Tool Invoked: summarize_text
Input: { "message": "Summarize the following text: LangChain enables developers to build agentic AI systems that can reason, use tools, and retrieve knowledge to solve complex tasks." }
```

This makes agent behavior **transparent and debuggable**.

---

## ⚙️ Tech Stack

* **TypeScript**
* **Node.js**
* **Express**
* **LangChain (JS v1)**
* **OpenAI (Chat + Embeddings)**
* **Zod (schema validation)**

---

## Automation & n8n Integration

This project is designed to be consumed by **automation tools** such as **n8n**:

* Use **HTTP Request nodes** to call `/api/chat`
* Chain agent responses into multi-step workflows
* Use agent decisions for routing, enrichment, or automation logic

---

## Getting Started

```bash
npm install
npm start
```

Create a `.env` file:

```
OPENAI_API_KEY=your_api_key_here
```

