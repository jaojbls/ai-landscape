# AI Tools & Environments


---

## 1. The Tool Landscape

AI tools in 2026 span a wide range — from backend model servers to fully autonomous coding agents. Most tools are now **hybrid**: they can run models locally AND connect to cloud providers.

The ecosystem breaks into 8 categories:

1. **Model Servers** — Backends that run/serve models via API (no UI)
2. **AI Desktop Apps** — Self-contained apps: local runner + chat UI + optional cloud
3. **AI Web UIs** — Browser interfaces that connect to model servers or cloud APIs
4. **Cloud AI Assistants** — Hosted chat interfaces (ChatGPT, Claude.ai, Gemini)
5. **Cloud Inference Platforms** — Run open-source models on rented hardware
6. **AI IDEs & Coding Assistants** — Code editors with integrated AI
7. **CLI Coding Agents** — Terminal-native agentic coding tools
8. **Autonomous Agents & No-Code** — Fully autonomous or no-code AI development

---

## 2. Model Servers (Backend — No UI)

Pure inference backends that load models and expose an API. Other tools (UIs, IDEs, scripts) connect to them.

| Tool | Interface | Local | Cloud | Platform | Key Feature |
|:--|:--|:--|:--|:--|:--|
| **Ollama** | CLI + API | ✅ | ✅ (subscription) | Cross-platform | One-line setup, OpenAI-compatible API |
| **LocalAI** | API | ✅ | ❌ | Cross-platform | Drop-in OpenAI replacement |
| **Foundry Local** | SDK / API | ✅ | ❌ | Windows | DirectML, .NET SDK |
| **Lemonade** | CLI + API | ✅ | ❌ | AMD Radeon | Unified runtime: LLMs, ASR, TTS |
| **Docker Model Runner** | Docker API | ✅ | ❌ | Cross-platform | Containerised model serving |

### Key Profiles

**Ollama** — The developer's backbone. One command to pull and run:

```bash
ollama run llama3.1:8b
```

Exposes an OpenAI-compatible API at `localhost:11434`. Powers Open WebUI, AnythingLLM, and many other tools. Supports both local models and cloud frontier models (subscription).

**Foundry Local** — Microsoft's Windows-native runner. Uses DirectML for GPU acceleration, integrates with .NET and Python SDKs. Pre-bundled models optimised for Windows hardware.

**Lemonade** — AMD's unified AI runtime for Radeon GPUs. Runs LLMs, speech recognition, and text-to-speech in a single package. Optimised for AMD hardware that's often underserved by the NVIDIA-centric ecosystem.

---

## 3. AI Desktop Apps (Runner + Chat UI)

Self-contained desktop apps that bundle a local inference engine with a chat interface. Most now also support cloud model APIs for access to frontier models.

| Tool | Local Runner | Cloud APIs | RAG | Cost | Key Feature |
|:--|:--|:--|:--|:--|:--|
| **LM Studio** | ✅ (llama.cpp) | ✅ (paid tier) | ❌ | Free | Visual model browser, local API server |
| **Jan** | ✅ | ✅ (paid tier) | ❌ | Free, open-source | Privacy-first, clean UI, hybrid mode |
| **GPT4All** | ✅ | ❌ | ✅ Built-in | Free, open-source | Simplest setup, bundled document chat |

### Key Profiles

**LM Studio** — The friendliest entry point for local AI. Browse and download models through a polished GUI. Can expose a local API server for other tools to connect to. Now supports cloud model subscriptions for frontier models like GPT-4o and Claude.

**Jan** — Privacy-first with a clean UI. Works fully offline, but can seamlessly switch to cloud APIs when you need frontier model capabilities. Open-source.

**GPT4All** — The beginner's choice. Download, install, chat. Built-in RAG lets you drag-and-drop documents for Q&A without any setup.

---

## 4. AI Web UIs (Frontend — Needs Backend)

Browser-based interfaces that connect to model servers or cloud APIs. They don't run models themselves — they need a backend like Ollama or a cloud provider.

| Tool | Connects To | Multi-user | RAG | Cost | Key Feature |
|:--|:--|:--|:--|:--|:--|
| **Open WebUI** | Ollama, cloud APIs | ✅ | ✅ | Free, open-source | "Self-hosted ChatGPT" |
| **AnythingLLM** | 35+ providers | ✅ | ✅ Built-in vector DB | Free, open-source | Universal provider hub |

### Key Profiles

**Open WebUI** — "ChatGPT, but self-hosted." Browser-based, multi-model, multi-user, with built-in RAG. Connects to Ollama via `docker compose up`. The go-to UI for teams running local models.

**AnythingLLM** — The universal connector. Supports 35+ LLM providers across 4 categories:

| Provider Type | Examples |
|:--|:--|
| **Local runners** | Ollama, LM Studio, LocalAI, Foundry Local, Lemonade, NVIDIA NIM, Docker Model Runner |
| **Cloud AI vendors** | OpenAI, Anthropic, Gemini, Mistral, DeepSeek, xAI, Cohere, Moonshot |
| **Cloud inference** | Groq, Together AI, Fireworks AI, AWS Bedrock, SambaNova, HuggingFace |
| **API aggregators** | OpenRouter, LiteLLM, APIpie, CometAPI, Generic OpenAI |

Built-in vector database, document embedding, and workspace management. Desktop app and self-hosted server.

---

## 5. Cloud AI Assistants

The most widely used AI tools in the world. Cloud-hosted, subscription-based, no setup required.

| Tool | Vendor | Free Tier | Paid | Key Differentiator |
|:--|:--|:--|:--|:--|
| **ChatGPT** | OpenAI | ✅ | $20/mo | Most popular, GPT-4o / o3 |
| **Claude.ai** | Anthropic | ✅ | $20/mo | Best reasoning, extended thinking, artifacts |
| **Gemini** | Google | ✅ | $20/mo | Deepest Google integration, largest free context |
| **Kimi** | Moonshot AI | ✅ | Paid tier | Strong reasoning, multilingual |
| **Perplexity** | Perplexity AI | ✅ | $20/mo | Search-first with citations |
| **Mercury** | Inception Labs | ✅ | Paid tier | First diffusion LLM, 1000+ tok/s, code + reasoning |

> **💡 Key insight:** For most people, a cloud assistant is their first and primary AI experience. Everything else in this document serves developers and power users who want more control.

---

## 6. Cloud Inference Platforms

Run **open-source models** (Llama, Qwen, Mistral, etc.) on their hardware. You pick the model, they provide the compute. Different from cloud assistants because you're renting inference, not using a proprietary product.

| Platform | Hardware | Differentiator |
|:--|:--|:--|
| **Groq** | Custom LPU | Fastest inference, ultra-low latency |
| **Together AI** | GPU cluster | Wide model selection, competitive pricing |
| **Fireworks AI** | GPU cluster | Fastest compound AI, function calling optimised |
| **AWS Bedrock** | AWS infrastructure | Enterprise, private VPC, managed |
| **SambaNova** | Custom SN40L chip | High throughput, enterprise |
| **HuggingFace Inference** | GPU cluster | Largest model hub, community |

### API Aggregators

One API → many providers. These don't run models — they route your request to the best/cheapest provider:

| Tool | Value Prop |
|:--|:--|
| **OpenRouter** | Unified API, price comparison across providers |
| **LiteLLM** | OpenAI-compatible proxy, self-hostable |

---

## 7. AI IDEs & Coding Assistants

Full code editors with integrated AI — the primary way developers interact with AI in 2026.

| Tool | Type | Price | Key Differentiator |
|:--|:--|:--|:--|
| **Cursor** | AI IDE (VS Code fork) | $20/mo | Composer (multi-file), Background Agents |
| **Windsurf** | AI IDE (VS Code fork) | $15/mo | Cascade (agent manager), Arena Mode |
| **Antigravity** | AI IDE | — | Google DeepMind, advanced agentic coding |
| **GitHub Copilot** | IDE Plugin | $10/mo | Enterprise standard, best test generation |
| **Zed** | Native Editor | Free/usage | Rust-native, starts in <1s, real-time collab |
| **Continue** | IDE Extension | Free | Open-source, multi-provider + local via Ollama |
| **JetBrains AI** | IDE Plugin | $10/mo | IntelliJ, PyCharm, WebStorm integration |

### Key Profiles

**Cursor** — The most popular AI IDE in 2026. A VS Code fork with deep AI integration: Composer for multi-file edits, tab completion, chat, and Background Agents that run autonomously. The "default choice" for professional developers.

**Windsurf** — Strong competitor with unique features: Cascade (an agent that manages the full edit lifecycle), Arena Mode (A/B test two models on the same task). More beginner-friendly than Cursor.

**Antigravity** — Google DeepMind's AI IDE with advanced agentic capabilities. Deep integration with Google's ecosystem and Gemini models. Browser automation, MCP support, and sophisticated planning workflows.

**GitHub Copilot** — The enterprise standard. Deepest GitHub integration, best test generation, conservative approach to code changes. The safest choice for corporate environments.

> **💡 Pro tip (2026):** Most senior devs use **two tools** — an AI IDE (Cursor, Windsurf, or Antigravity) for daily editing + a CLI agent (Claude Code or Gemini CLI) for complex architectural tasks.

---

## 8. CLI Coding Agents

Terminal-native tools for **agentic coding** — AI that reads your codebase, edits files, runs commands, and iterates autonomously.

| Tool | Vendor | Key Feature | Model Support |
|:--|:--|:--|:--|
| **Claude Code** | Anthropic | 1M context, filesystem + terminal access | Claude models |
| **Gemini CLI** | Google | Google ecosystem, Gemini models | Gemini models |
| **OpenAI Codex** | OpenAI | Best review UI, worktree support | GPT models |
| **Aider** | Open-source | Git-aware, auto-commits, diff editing | Multi-provider |
| **Cline** | Open-source | VS Code extension, browser automation, MCP | Multi-provider |

### Key Profiles

**Claude Code** — A terminal-native AI agent that goes far beyond autocomplete. It reads your codebase → plans changes → edits files → runs tests → iterates. Full system access. Best for complex refactoring and multi-file feature development.

```bash
npm install -g @anthropic-ai/claude-code
claude
```

**Gemini CLI** — Google's terminal agent, powered by Gemini models. Deep integration with Google Cloud and the broader Google developer ecosystem.

**Aider** — The git-native AI coding tool. Automatically creates git commits for each change, shows diffs before applying. Supports multiple AI providers including local models via Ollama.

```bash
pip install aider-chat
aider --model claude-3-sonnet
```

**Cline** — An in-editor agent (VS Code extension) that creates a plan, then executes file edits, terminal commands, and browser actions. Shows each step for human approval. 5M+ installs.

---

## 9. Autonomous Agents & No-Code Builders

### Autonomous Development Agents

Tools that operate with **minimal human guidance** — give them a task and they plan, code, test, and deploy:

| Tool | Type | Price | How It Works |
|:--|:--|:--|:--|
| **Devin AI** | Autonomous agent | $20/mo | End-to-end: plan → code → test → deploy |
| **Replit Agent** | Browser IDE | $20/mo | Full-stack from prompt, zero local setup |

### No-Code / Low-Code Builders

For rapid prototyping without writing code:

| Tool | Best For | Output |
|:--|:--|:--|
| **Lovable** | Web app prototypes | Deployed React apps from descriptions |
| **Bolt.new** | Full-stack apps | Working apps in the browser |
| **v0** (Vercel) | UI components | React/Next.js components from prompts |

---

## 10. Tool Selection Guide

```
What do you need?
│
├── Chat with AI (no setup)?
│   └── ChatGPT, Claude.ai, or Gemini
│
├── Run models locally?
│   ├── Prefer a GUI? → LM Studio or Jan
│   ├── Prefer terminal / API? → Ollama
│   ├── Windows + DirectML? → Foundry Local
│   ├── AMD GPU? → Lemonade
│   └── Browser-based (team)? → Open WebUI + Ollama
│
├── Run open-source models in the cloud?
│   ├── Fastest inference? → Groq
│   ├── Widest selection? → Together AI
│   └── Enterprise / AWS? → Bedrock
│
├── Connect to many providers?
│   └── AnythingLLM (35+ providers, built-in RAG)
│
├── AI-assisted coding?
│   ├── Full IDE? → Cursor, Windsurf, or Antigravity
│   ├── Enterprise / GitHub? → GitHub Copilot
│   ├── JetBrains user? → JetBrains AI
│   ├── Open-source / local? → Continue
│   ├── Terminal agentic? → Claude Code or Gemini CLI
│   └── Git-aware? → Aider
│
├── Fully autonomous development?
│   └── Devin AI or Replit Agent
│
└── Rapid prototype (no code)?
    └── Lovable, Bolt.new, or v0
```
