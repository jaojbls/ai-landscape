# T3 Adaptability

> **Living Stack — Tier 3** | The part that changes **daily**
>
> For the technology reference, see [07-llm-extensions.md](./07-llm-extensions.md)

---

## 1. What Is Adaptability?

Adaptability is everything you add **at runtime** — without retraining or modifying the model weights. It's the fastest-changing, most accessible layer of the AI stack.

```
Foundation (static, yearly)         → "The brain"
Alignment (semi-static, monthly)    → "Personality and skills"
Adaptability (dynamic, daily)       → "Current knowledge, tools, and memory"
```

This is where **most practitioners spend their time**. You don't pre-train models. You rarely fine-tune. But you connect them to tools, inject knowledge, and give them memory — every day.

---

## 2. RAG — Retrieval-Augmented Generation

RAG is the most impactful adaptability technique. It gives an LLM access to **external knowledge** without changing the model itself.

### The Full RAG Pipeline

```
┌─────────────────── INDEX PHASE (once or on schedule) ───────────────────┐
│                                                                          │
│  Documents (PDF, Markdown, DB, API)                                      │
│      │                                                                   │
│      ├── 1. Load & parse (extract text, handle tables, images)           │
│      ├── 2. Chunk (split into 256–1024 token segments)                   │
│      ├── 3. Embed (convert each chunk to a vector)                       │
│      └── 4. Store (insert vectors + metadata into vector DB)             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌─────────────────── QUERY PHASE (every request) ─────────────────────────┐
│                                                                          │
│  User Query                                                              │
│      │                                                                   │
│      ├── 1. Embed the query (same model as indexing)                     │
│      ├── 2. Search vector DB (find top-K most similar chunks)            │
│      ├── 3. Rerank (optional: re-score results with a cross-encoder)     │
│      ├── 4. Inject into prompt (retrieved chunks become context)         │
│      └── 5. LLM generates answer (grounded in retrieved data)            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Chunking Strategies

How you split documents dramatically affects retrieval quality:

| Strategy | How It Works | Best For | Chunk Size |
|:--|:--|:--|:--|
| **Fixed-size** | Split every N tokens | Simple, predictable | 256–512 tokens |
| **Recursive** | Split by headers → paragraphs → sentences | Structured docs (Markdown, HTML) | Varies |
| **Semantic** | Split on meaning boundaries (topic shifts) | Unstructured text | Varies |
| **Sentence-window** | Retrieve sentence, expand to surrounding window | Precise retrieval + context | Sentence + window |
| **Parent-child** | Small chunks for search, return parent chunk | Best of both (precision + context) | Child: 128, Parent: 512 |

> **💡 Start with recursive chunking at 512 tokens with 10–20% overlap.** It works well for most cases. Optimise later.

### Embedding Models

Embedding models convert text into dense vectors that capture semantic meaning:

| Model | Dimensions | Max Tokens | Creator | Strengths |
|:--|:--|:--|:--|:--|
| **text-embedding-3-large** | 3072 | 8191 | OpenAI | Best overall, adjustable dimensions |
| **text-embedding-3-small** | 1536 | 8191 | OpenAI | Cost-efficient, 5x cheaper |
| **BGE-large-en-v1.5** | 1024 | 512 | BAAI | Best open-source English |
| **E5-large-v2** | 1024 | 512 | Microsoft | Strong general-purpose |
| **Nomic Embed Text v1.5** | 768 | 8192 | Nomic AI | Long context, open-source |
| **GTE-Qwen2** | 1536 | 8192 | Alibaba | Best open-source multilingual |
| **Voyage-3** | 1024 | 32000 | Voyage AI | Very long context |

**Choosing an embedding model:**
```
Need best quality, budget allows?         → text-embedding-3-large
Need cost efficiency?                     → text-embedding-3-small
Need open-source / self-hosted?           → BGE-large or GTE-Qwen2
Need long document support?               → Nomic Embed or Voyage-3
Need multilingual?                        → GTE-Qwen2
```

### Vector Databases

Where you store and search your embeddings:

| Database | Type | Best For | Scaling | Key Feature |
|:--|:--|:--|:--|:--|
| **ChromaDB** | Embedded | Prototyping, small scale | Single node | Simplest setup, in-process |
| **Qdrant** | Dedicated | Production, high performance | Distributed | Fast, rich filtering |
| **Weaviate** | Dedicated | Multi-modal search | Distributed | Hybrid search (vector + keyword) |
| **Pinecone** | Cloud SaaS | Managed, zero-ops | Fully managed | No infrastructure to manage |
| **pgvector** | PostgreSQL ext. | Existing Postgres infrastructure | PostgreSQL scaling | No new database needed |
| **Milvus** | Dedicated | Large-scale enterprise | Distributed | Billion-scale vectors |

**Choosing a vector database:**
```
Just prototyping?                         → ChromaDB (in-process, 5 lines of code)
Already using PostgreSQL?                 → pgvector (no new infra)
Need production performance?              → Qdrant or Weaviate
Don't want to manage infrastructure?      → Pinecone (managed SaaS)
Enterprise scale (billions of vectors)?   → Milvus
```

### Reranking — The Quality Multiplier

Initial vector search is fast but approximate. Reranking re-scores the top-K results with a more accurate (but slower) cross-encoder model:

```
Query → Vector search (fast, broad) → Top 20 candidates
    → Reranker (slow, precise) → Top 5 best results
    → Inject into LLM context
```

| Reranker | Type | Best For |
|:--|:--|:--|
| **Cohere Rerank** | API | Best quality, easiest to use |
| **BGE-Reranker** | Open-source | Self-hosted, no API costs |
| **FlashRank** | Open-source | Fast, lightweight |

> **💡 Reranking typically improves RAG quality by 10–30% with minimal added latency.** Always worth trying.

### Advanced RAG Patterns

| Pattern | How It Works | When to Use |
|:--|:--|:--|
| **HyDE** | Generate hypothetical answer, embed that instead of query | Short queries, vague questions |
| **Multi-Query** | Generate multiple query variants, union results | Complex questions needing diverse angles |
| **Agentic RAG** | Agent decides what to retrieve and when | Multi-step research tasks |
| **Corrective RAG** | Evaluate retrieval quality, re-query if poor | High-stakes applications |
| **Graph RAG** | Combine knowledge graphs with vector search | Highly connected data (relationships) |

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

| Pattern | How It Works | Best For | Complexity |
|:--|:--|:--|:--|
| **Single Agent** | One LLM + tools, iterative loop | Simple tasks, coding agents | Low |
| **Multi-Agent** | Multiple specialised agents coordinating | Complex workflows | High |
| **Planner-Executor** | One agent plans, another executes | Tasks needing review/approval | Medium |
| **Hierarchical** | Manager agent delegates to worker agents | Enterprise automation | High |
| **Reflexion** | Agent evaluates its own output, retries | Quality-critical tasks | Medium |

### Agent Frameworks

| Framework | Approach | Best For | Learning Curve |
|:--|:--|:--|:--|
| **LangGraph** | Stateful graphs with cycles | Complex, multi-step workflows | High |
| **CrewAI** | Role-based agent teams | Task delegation, team simulation | Medium |
| **AutoGen** | Multi-agent conversation | Collaborative problem-solving | Medium |
| **DSPy** | Programmatic prompt optimisation | Systematic prompt engineering | High |
| **LlamaIndex** | RAG-focused orchestration | Knowledge-heavy applications | Medium |
| **Smolagents** (HF) | Minimal, code-first agents | Quick prototyping | Low |

### Agent Safety & Evaluation

Agents that act in the real world need guardrails:

| Risk | Mitigation |
|:--|:--|
| **Unintended actions** | Human-in-the-loop approval for destructive operations |
| **Infinite loops** | Max iteration limits, cost caps |
| **Hallucinated tool calls** | Schema validation, parameter checking |
| **Data leakage** | Scope tool access, least-privilege principles |
| **Cost runaway** | Token budgets, billing alerts |

---

## 4. Tool Use & Protocols

### Function Calling — The Foundation

Function calling is the mechanism that lets an LLM **request specific actions** in a structured format:

```
1. You define available functions (name, parameters, descriptions)
2. User sends a message
3. LLM decides if a function should be called
4. LLM outputs structured JSON: {"function": "get_weather", "args": {"city": "Sydney"}}
5. Your code executes the function
6. Result is fed back to the LLM
7. LLM generates the final response
```

### MCP — Model Context Protocol

MCP is an **open standard** (created by Anthropic, adopted widely) that provides a universal way for AI tools to connect to external tools and data sources.

**The problem it solves:**
```
Before MCP: N tools × M AI apps = N×M custom integrations
After MCP:  N tools → MCP ← M AI apps = N+M implementations
```

**Architecture:**
```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│  MCP Host   │     │  MCP Client │     │   MCP Server    │
│  (AI app)   │────▶│  (in host)  │────▶│  (tool/data)    │
│             │     │             │     │                 │
│  Claude     │     │  Manages    │     │  - Notion       │
│  Cursor     │     │  connections│     │  - GitHub       │
│  Antigravity│     │             │     │  - Filesystem   │
└─────────────┘     └─────────────┘     └─────────────────┘
```

**What MCP servers provide:**

| Capability | Description | Example |
|:--|:--|:--|
| **Tools** | Functions the AI can call | `search_notion`, `create_github_issue` |
| **Resources** | Data the AI can read | Database contents, file listings |
| **Prompts** | Reusable prompt templates | Code review template, analysis framework |

**Key MCP servers:**

| Server | What It Connects To |
|:--|:--|
| `filesystem` | Local files and directories |
| `notion` | Notion pages, databases |
| `github` | Repos, issues, PRs |
| `slack` | Channels, messages |
| `postgres` | PostgreSQL databases |
| `brave-search` | Web search |

> **💡 Think of MCP as "USB-C for AI"** — a single standard connector that works with any tool and any AI application.

### A2A — Agent-to-Agent Protocol

Google's open standard for **agents communicating with each other** (complementary to MCP):

| Protocol | Purpose | Scope |
|:--|:--|:--|
| **MCP** | AI ↔ Tools/Data | Connect to external capabilities |
| **A2A** | Agent ↔ Agent | Coordinate between autonomous agents |

MCP connects an agent to tools. A2A connects agents to each other. They're complementary:

```
Agent A (research)  ←─ A2A ─→  Agent B (writing)
    │                               │
    MCP                             MCP
    │                               │
 Notion, Web                   Google Docs, Email
```

---

## 5. Memory — Persistence Across Sessions

Memory gives an AI the ability to **remember** across conversations, building context over time.

### Memory Types

| Type | Scope | Lifespan | Mechanism | Example |
|:--|:--|:--|:--|:--|
| **Context Window** | Single conversation | Session | Token buffer | Chat history within current conversation |
| **Short-term** | Recent interactions | Hours/days | Summarisation | "You mentioned you prefer Python yesterday" |
| **Long-term** | User profile + preferences | Permanent | Structured storage | "User is a senior engineer who works with TypeScript" |
| **Episodic** | Specific past events | Permanent | Indexed logs | "In our March conversation, we decided to use Supabase" |
| **Semantic** | Knowledge/facts | Permanent | Vector DB (RAG) | Retrieved from embedded knowledge base |

### Implementation Patterns

| System | How It Works | Best For |
|:--|:--|:--|
| **Knowledge Items (KIs)** | Curated, distilled knowledge stored as artifacts | High-value, reviewed information |
| **Conversation logs** | Raw logs searchable by topic or recency | Full history, audit trail |
| **Vector memory** | Embeddings of past interactions, retrieved by similarity | "Remembering" relevant past context |
| **Structured profiles** | JSON/YAML user preferences and context | Persistent configuration |
| **Summarisation chains** | Compress old conversations into summaries | Bounded storage, key insights |

### Memory Management

The hard problem isn't storing memory — it's deciding **what to remember and what to forget**:

```
Every interaction
    │
    ├── Is this a fact I should remember? → Long-term memory
    ├── Is this a preference/pattern? → User profile
    ├── Is this a one-off detail? → Discard after session
    └── Is this a key decision? → Episodic memory
```

> **💡 The best memory systems are selective, not comprehensive.** Storing everything creates noise. Curated memory (like Knowledge Items) consistently outperforms raw log retrieval.

---

## 6. RAG vs Fine-Tuning — The Definitive Guide

This is the most common decision practitioners face. The answer depends on **what kind of customisation you need**:

### Decision Matrix

| Question | RAG | Fine-Tuning |
|:--|:--|:--|
| Data changes frequently? | ✅ Update docs, instant effect | ❌ Must retrain |
| Need source citations? | ✅ Can point to retrieved chunks | ❌ Model doesn't cite sources |
| Need domain *language* (jargon, terminology)? | ⚠️ Partial (via context) | ✅ Model internalises domain language |
| Need domain *behaviour* (style, format)? | ❌ Can't change model behaviour | ✅ SFT teaches style and format |
| Privacy-sensitive data? | ✅ Data stays in your infra | ⚠️ Data used in training (less control) |
| Budget is limited? | ✅ Infrastructure cost only | ⚠️ Training costs (GPU hours) |
| Need to work tomorrow? | ✅ Hours to set up | ❌ Days/weeks to fine-tune |
| Want best quality? | ⚠️ Limited by retrieval quality | ✅ Deeper knowledge integration |

### The Hybrid Approach

The best production systems combine both:

```
Fine-tune for EXPERTISE (permanent):
  → Domain language, tone, format, reasoning patterns
  → "Be a legal assistant that writes in formal style"

RAG for DATA (dynamic):
  → Current cases, regulations, client documents
  → "Here are the relevant statutes for this case"

Together:
  → A model that speaks your domain's language AND has access to current data
```

### Worked Examples

**"I want my AI to know our company policies"**
→ **RAG.** Policies change. Embed the policy docs, retrieve when relevant. No retraining needed when policies update.

**"I want my AI to write in our brand voice"**
→ **Fine-tune (SFT/LoRA).** Brand voice is a behaviour, not data. Train on examples of your brand's writing style.

**"I want my AI to understand medical terminology"**
→ **CPT + Fine-tune.** The model needs to deeply understand medical language (CPT) and follow clinical response formats (SFT).

**"I want my AI to answer questions about today's news"**
→ **RAG with web search.** News changes hourly. RAG with a search tool gives real-time access.

**"I want my AI to be a coding assistant for our proprietary framework"**
→ **Both.** Fine-tune on your framework's code (behaviour). RAG on your docs and API reference (data).

---

## 7. The Adaptability Advantage

This is where most practitioners should invest their energy. The economics are compelling:

| Layer | Change Cost | Change Speed | Skill Required |
|:--|:--|:--|:--|
| Foundation | $5M–$100M | Months | PhD team, supercluster |
| Alignment | $10–$50K | Days–weeks | ML engineer, multi-GPU |
| **Adaptability** | **$0–$1K** | **Hours** | **Any developer** |

The foundation and alignment are done for you by labs and the open-source community. The adaptability layer is where **you** add value:

- **RAG** — your private data becomes the model's knowledge
- **Agents** — the model takes actions in your systems
- **MCP** — universal connectors to your tools
- **Memory** — the model remembers your context

```
The model itself changes slowly.
The context around it changes constantly.
That's where your competitive advantage lives.
```
