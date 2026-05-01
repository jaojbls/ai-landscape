# L7 LLM Extensions

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)
>
> **📌 Decision guidance:** For RAG vs fine-tuning decisions, see the Living Stack: [L3-adaptability.md](./L3-adaptability.md)

---

## 1. Why Extensions Matter

A base LLM is powerful but limited:
- ❌ Can't access the internet or your files
- ❌ Can't take actions (send emails, write code, query databases)
- ❌ Doesn't know your private data
- ❌ Forgets everything between sessions
- ❌ Knowledge frozen at training cutoff date

**Extensions** solve all of these. They turn an LLM from a "smart text predictor" into an **autonomous agent** that can perceive, reason, act, and remember.

---

## 2. The Extension Ecosystem

| Component | Role | Analogy |
|:--|:--|:--|
| 🧠 **LLM** | Reasoning engine | The Brain |
| 🤖 **Agent** | Plans + executes autonomously | The Actor |
| 🔗 **Function Calling** | Structured tool invocation | The API Contract |
| 🔌 **MCP** | Universal tool connector | USB-C Port |
| 🔧 **Tools** | Specific capabilities (files, web, code) | The Hands |
| 📚 **RAG** | External knowledge grounding | The Library |
| 🧠💾 **Memory** | Persistent state across sessions | Long-term Memory |

---

## 3. Agents — From Talkers to Doers

An AI agent is an LLM that can **plan, use tools, and iterate** autonomously to complete a task.

### The ReAct Pattern

Most agents follow **ReAct** (Reasoning + Acting):

```
User: "Find the cheapest flight from Sydney to Tokyo next month"

Agent:
  Think: I need to search for flights. Let me use the flight search tool.
  Act:   [calls flight_search(from="SYD", to="TYO", date="2026-06")]
  Observe: Found 12 results. Cheapest is Jetstar at $489.
  Think: I should check if there are flexible date options.
  Act:   [calls flight_search(from="SYD", to="TYO", date="2026-06", flexible=true)]
  Observe: Flexible dates show $425 on June 12.
  Answer: "The cheapest flight is Jetstar on June 12 at $425."
```

### Agent Architecture Types

| Pattern | How It Works | Best For |
|:--|:--|:--|
| **Single Agent** | One LLM + tools, iterative loop | Simple tasks, coding agents |
| **Multi-Agent** | Multiple specialised agents coordinating | Complex workflows |
| **Planner-Executor** | One agent plans, another executes | Tasks needing review/approval |
| **Hierarchical** | Manager agent delegates to worker agents | Enterprise automation |

### Multi-Agent Frameworks

| Framework | Approach | Best For |
|:--|:--|:--|
| **LangGraph** | Stateful graphs with cycles | Complex, multi-step workflows |
| **CrewAI** | Role-based agent teams | Task delegation, team simulation |
| **AutoGen** | Multi-agent conversation | Collaborative problem-solving |
| **DSPy** | Programmatic prompt optimisation | Systematic prompt engineering |
| **LlamaIndex** | RAG-focused orchestration | Knowledge-heavy applications |

---

## 4. Function Calling — The Bridge from Words to Actions

Function calling is the mechanism that lets an LLM **request specific actions** in a structured format.

**How it works:**

```
1. You define available functions (name, parameters, descriptions)
2. User sends a message
3. LLM decides if a function should be called
4. LLM outputs structured JSON: {"function": "get_weather", "args": {"city": "Sydney"}}
5. Your code executes the function
6. Result is fed back to the LLM
7. LLM generates the final response
```

**Example function definition:**
```json
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {"type": "string", "description": "City name"},
      "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
    },
    "required": ["city"]
  }
}
```

> **💡 Key insight:** Function calling is the foundation that makes everything else work — MCP, tools, and agents all depend on the LLM's ability to produce structured function calls.

---

## 5. MCP — Model Context Protocol

MCP is an **open standard** (created by Anthropic) that provides a universal way for AI applications to connect to external tools and data sources.

### The Problem MCP Solves

Before MCP, every AI tool had its own custom integration format:
```
Before: N tools × M AI apps = N×M custom integrations
After:  N tools → MCP ← M AI apps = N+M implementations
```

### MCP Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│  MCP Host   │     │  MCP Client │     │   MCP Server    │
│  (AI app)   │────▶│  (in host)  │────▶│  (tool/data)    │
│             │     │             │     │                 │
│  Claude     │     │  Manages    │     │  - Notion       │
│  Cursor     │     │  connections│     │  - GitHub       │
│  VS Code    │     │             │     │  - Filesystem   │
└─────────────┘     └─────────────┘     └─────────────────┘
```

### What MCP Servers Provide

| Capability | Description | Example |
|:--|:--|:--|
| **Tools** | Functions the AI can call | `search_notion`, `create_github_issue` |
| **Resources** | Data the AI can read | Database contents, file listings |
| **Prompts** | Reusable prompt templates | Code review template, analysis framework |

### Key MCP Servers

| Server | What It Connects To |
|:--|:--|
| `filesystem` | Local files and directories |
| `notion` | Notion pages, databases |
| `github` | Repos, issues, PRs |
| `slack` | Channels, messages |
| `postgres` | PostgreSQL databases |
| `brave-search` | Web search |

> **💡 Think of MCP as "USB-C for AI"** — a single standard connector that works with any tool and any AI application.

---

## 6. RAG — Retrieval-Augmented Generation

RAG gives an LLM access to **external knowledge** without changing the model itself.

### How RAG Works

```
1. Index Phase (once):
   Documents → Chunk → Embed → Store in Vector DB

2. Query Phase (every request):
   User query → Embed → Search vector DB → Retrieve top-K chunks
   → Inject into prompt → LLM generates grounded answer
```

### Why RAG Instead of Fine-Tuning?

| Approach | When to Use |
|:--|:--|
| **RAG** | Data changes frequently, need source citations, private data |
| **Fine-tuning** | Teaching style/format, permanent domain knowledge, no runtime DB needed |
| **Both** | Fine-tune for domain expertise + RAG for current data |

### Key Components

**Embedding Models** — Convert text to vectors (see [01-model-architectures.md](./01-model-architectures.md)):
- OpenAI text-embedding-3, BGE, E5, Nomic Embed

**Vector Databases** — Store and search embeddings:

| Database | Type | Best For |
|:--|:--|:--|
| **ChromaDB** | Embedded | Prototyping, small scale |
| **Qdrant** | Dedicated | Production, high performance |
| **Weaviate** | Dedicated | Multi-modal search |
| **Pinecone** | Cloud SaaS | Managed, zero-ops |
| **pgvector** | PostgreSQL extension | Existing Postgres infrastructure |
| **Milvus** | Dedicated | Large-scale enterprise |

**Chunking Strategies:**
- Fixed-size (512 tokens) — simple, works well
- Semantic chunking — split on meaning boundaries
- Recursive — split by headers, paragraphs, sentences
- Overlap — include surrounding context (10–20% overlap)

**Reranking** — After retrieval, re-score results with a more accurate (but slower) model for better relevance.

---

## 7. Memory — Persistence Across Sessions

Memory gives an AI the ability to **remember** across conversations.

### Memory Types

| Type | Scope | Lifespan | Example |
|:--|:--|:--|:--|
| **Context Window** | Single conversation | Session | Chat history within the current conversation |
| **Short-term** | Recent interactions | Hours/days | "You mentioned you prefer Python yesterday" |
| **Long-term** | User profile + preferences | Permanent | "User is a senior engineer who works with TypeScript" |
| **Episodic** | Specific past events | Permanent | "In our March conversation, we decided to use Supabase" |
| **Semantic** | Knowledge/facts | Permanent | Stored in vector DB, retrieved via RAG |

### Implementations

| System | How It Works |
|:--|:--|
| **Knowledge Items (KIs)** | Curated, distilled knowledge stored as artifacts |
| **Conversation logs** | Raw logs searchable by topic or recency |
| **Vector memory** | Embeddings of past interactions, retrieved by similarity |
| **Structured profiles** | JSON/YAML user preferences and context |

---

## 8. Protocols & Standards

### A2A — Agent-to-Agent Protocol

Google's open standard for **agents communicating with each other** (complementary to MCP):

| Protocol | Purpose | Scope |
|:--|:--|:--|
| **MCP** | AI ↔ Tools/Data | Connect to external capabilities |
| **A2A** | Agent ↔ Agent | Coordinate between autonomous agents |

A2A is newer and still emerging. MCP is more established and widely adopted.

---

## 9. Glossary

| Term | Definition |
|:--|:--|
| **Agent** | An LLM-powered system that can plan, use tools, and iterate autonomously |
| **Context Window** | The maximum number of tokens a model can process at once |
| **Embedding** | A dense vector representation of text that captures semantic meaning |
| **Function Calling** | The ability of an LLM to output structured tool invocation requests |
| **Grounding** | Connecting LLM responses to verifiable external data (via RAG) |
| **Hallucination** | When a model generates plausible but factually incorrect information |
| **KV Cache** | Stored key-value pairs from attention, reused to speed up generation |
| **MCP** | Model Context Protocol — universal standard for AI-tool connections |
| **RAG** | Retrieval-Augmented Generation — injecting external knowledge into prompts |
| **ReAct** | Reasoning + Acting — the dominant agent loop pattern |
| **System Prompt** | Instructions that shape model behaviour, set before the user's message |
| **Token** | The basic unit of text processing (~4 characters or ¾ of a word in English) |
| **Tool Use** | The ability of an agent to invoke external functions or APIs |
| **Vector DB** | A database optimised for storing and searching embedding vectors |
