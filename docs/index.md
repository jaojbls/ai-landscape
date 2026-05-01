# 🧱 Building Blocks of AI v2 — Overview

> **Main entry point.** Start here for the big picture, then follow links to the deep-dives.

---

## The AI Stack: 7 Layers

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 1: MODEL ARCHITECTURES (The Brains)                     │
│  → Deep-dive: 01-model-architectures.md                        │
│                                                                 │
│  Architectures:                                                 │
│  • Transformer (autoregressive) — GPT, Claude, Llama, Gemini    │
│  • Transformer (diffusion) — Mercury (Inception Labs)           │
│  • Transformer + MoE routing — Mixtral, DBRX, GPT-4            │
│  • U-Net / DiT — Stable Diffusion, FLUX, Sora                  │
│  • State Space (Mamba) — Mamba, RWKV, Jamba                     │
│  • Transformer (encoder) — BGE, E5, Nomic (embeddings)         │
│  • Transformer (ternary) — BitNet b1.58 (emerging)              │
│  • Joint Embedding Predictive — I-JEPA, V-JEPA (emerging)      │
│                                                                 │
│  Generative Paradigms:                                          │
│  • Autoregressive (next token) — LLMs, MoE LLMs, SSMs          │
│  • Diffusion (denoising) — image/video/audio + text (Mercury)   │
│  • Predictive (representation space) — JEPA (research)          │
│  • Non-generative — embeddings, classification                  │
│                                                                 │
│  Capabilities: multimodal, reasoning, code, tool use            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 2: TRAINING & ADAPTATION (The Evolution)                │
│  → Deep-dive: 02-training-adaptation.md                        │
│                                                                 │
│  2A. Pre-Training (from scratch)                                │
│      → Trillions of tokens, $$$ millions, only for labs         │
│                                                                 │
│  2B. Continued Pre-Training (CPT)                               │
│      → Domain adaptation (legal, medical, finance)              │
│                                                                 │
│  2C. Fine-Tuning                                                │
│      • SFT (Supervised Fine-Tuning) — teaches format/style      │
│      • Preference Optimisation — DPO, RLHF (PPO), GRPO         │
│      • LoRA / QLoRA — lightweight, consumer GPU accessible      │
│                                                                 │
│  2D. Distillation                                               │
│      → Large teacher model → small student model (80-90% qual)  │
│                                                                 │
│  2E. Inference-Time Scaling                                     │
│      → Chain-of-thought, thinking tokens, test-time compute     │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3: HARDWARE & COMPUTE (The Body)                        │
│  → Deep-dive: 03-hardware.md                                   │
│                                                                 │
│  • CPU (Intel, AMD, ARM) — GGUF inference, no GPU needed        │
│  • GPU (NVIDIA, AMD) — training + batch inference               │
│  • TPU (Google) — cloud ML at scale                             │
│  • LPU (Groq) — ultra-low latency inference                     │
│  • NPU (Qualcomm, Intel, Apple) — edge/mobile/on-device         │
│  • Apple Silicon (UMA) — unified memory for local inference     │
│  • ASIC (AWS Inferentia/Trainium, Cerebras) — cloud scale       │
│  • Analog AI (Mythic) — ultra-low power edge                    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 4: MODEL FORMATS & QUANTISATION (The Compression)       │
│  → Deep-dive: 04-model-formats.md                              │
│                                                                 │
│  Weight Formats:     SafeTensors, GGUF                          │
│  Interchange:        ONNX (cross-platform portability)          │
│  Vendor-Optimised:   TensorRT (NVIDIA), CoreML (Apple),         │
│                      MLX (Apple), OpenVINO (Intel),              │
│                      TFLite (Google), QNN (Qualcomm)             │
│                                                                 │
│  Quantisation: FP16 → INT8 → INT4 → INT3                       │
│  Methods: GPTQ, AWQ, EXL2, BitsAndBytes, GGUF K-quants         │
│  Default: Q4_K_M — ~75% size reduction, minor quality loss      │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 5: INFERENCE ENGINES (The Runtime)                      │
│  → Deep-dive: 05-inference-engines.md                          │
│                                                                 │
│  Local:   llama.cpp, MLX, ExLlamaV2, bitnet.cpp (1.58-bit)     │
│  Server:  vLLM, SGLang, TGI, TensorRT-LLM, Triton              │
│  Edge:    CoreML Runtime, ONNX Runtime, TFLite Runtime          │
│                                                                 │
│  Key insight: Ollama is the wrapper, llama.cpp is the engine    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 6: TOOLS & ENVIRONMENTS (The Interface)                 │
│  → Deep-dive: 06-tools.md                                      │
│                                                                 │
│  6A. Model Servers (backend, no UI)                              │
│      • Ollama, LocalAI, Foundry Local, Lemonade                 │
│                                                                 │
│  6B. Desktop Apps (runner + chat UI, local + cloud)             │
│      • LM Studio, Jan, GPT4All                                  │
│                                                                 │
│  6C. Web UIs (frontend, needs backend)                          │
│      • Open WebUI, AnythingLLM (35+ providers)                  │
│                                                                 │
│  6D. Cloud Assistants                                            │
│      • ChatGPT, Claude.ai, Gemini, Kimi, Perplexity             │
│                                                                 │
│  6E. Cloud Inference (run OSS models on rented hardware)        │
│      • Groq, Together AI, Fireworks, Bedrock, SambaNova          │
│                                                                 │
│  6F. AI IDEs                                                     │
│      • Cursor, Windsurf, Antigravity, Copilot, Zed, Continue    │
│                                                                 │
│  6G. CLI Coding Agents                                           │
│      • Claude Code, Gemini CLI, Codex, Aider, Cline             │
│                                                                 │
│  6H. Autonomous / No-Code                                        │
│      • Devin AI, Replit Agent, Lovable, Bolt.new, v0             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 7: EXTENSIONS & CAPABILITIES (The Intelligence)         │
│  → Deep-dive: 07-llm-extensions.md                             │
│                                                                 │
│  7A. Agents                                                     │
│      • Single-agent, multi-agent, planner-executor              │
│      • Frameworks: LangGraph, CrewAI, AutoGen, DSPy             │
│                                                                 │
│  7B. Tool Use & Protocols                                       │
│      • MCP (Model Context Protocol) — Anthropic standard        │
│      • A2A (Agent-to-Agent) — Google/Linux Foundation            │
│      • Function Calling / Tool Use schemas                      │
│                                                                 │
│  7C. RAG & Knowledge                                            │
│      • Vector DBs: Qdrant, Chroma, Pinecone, pgvector           │
│      • Embeddings + chunking + reranking pipeline               │
│                                                                 │
│  7D. Memory                                                     │
│      • Short-term (context), long-term (vector),                 │
│        episodic (conversation history)                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## The Full Path: End-to-End Example

```
1. Model:      Llama 3.1 70B (Transformer LLM, autoregressive, MoE)
2. Training:   Pre-trained by Meta → SFT + DPO → Instruct variant
3. Hardware:   Mac Studio M4 Ultra, 192 GB unified memory
4. Format:     GGUF Q4_K_M (~40 GB file)
5. Engine:     llama.cpp (via Metal acceleration)
6. Tool:       Ollama serving API → Open WebUI for chat
7. Extensions: RAG with ChromaDB for private docs, MCP for Notion
```

---

## The Living Stack — A Second View

The 7-layer stack above is a **technology catalog** — "what are the building blocks?" The Living Stack is a **practitioner workflow** — "how do I customize AI for my use case?"

These are two views of the same system:

```
┌─────────────────────────────────────────────────────────────────┐
│  THE LIVING STACK                                               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  TIER 3: ADAPTABILITY (changes daily)                     │  │
│  │  → Deep-dive: L3-adaptability.md                          │  │
│  │                                                           │  │
│  │  • RAG — inject external knowledge at runtime             │  │
│  │  • Agents — plan, use tools, iterate autonomously         │  │
│  │  • MCP / A2A — universal tool and agent protocols         │  │
│  │  • Memory — persistence across sessions                   │  │
│  │                                                           │  │
│  │  ⚡ Cost: $0–$1K  |  Speed: hours  |  Skill: any dev      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ▲                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  TIER 2: ALIGNMENT (changes weekly/monthly)               │  │
│  │  → Deep-dive: L2-alignment.md                             │  │
│  │                                                           │  │
│  │  • SFT — teach format, style, instruction-following       │  │
│  │  • RLHF / DPO / GRPO — teach quality and preferences     │  │
│  │  • LoRA / QLoRA — fine-tune on consumer GPUs              │  │
│  │  • Distillation — compress large models into small ones   │  │
│  │                                                           │  │
│  │  💰 Cost: $10–$50K  |  Speed: days  |  Skill: ML eng      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ▲                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  TIER 1: FOUNDATION (changes yearly)                      │  │
│  │  → Deep-dive: L1-foundation.md                            │  │
│  │                                                           │  │
│  │  • Base model selection (Llama, GPT, Claude, Gemini)      │  │
│  │  • Pre-training (labs only, $5M–$100M+)                   │  │
│  │  • Continued pre-training (domain adaptation)             │  │
│  │                                                           │  │
│  │  🏗️ Cost: $5M+  |  Speed: months  |  Skill: PhD team     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  The model itself changes slowly.                               │
│  The context around it changes constantly.                      │
│  That's where your competitive advantage lives.                 │
└─────────────────────────────────────────────────────────────────┘
```

### How the Two Stacks Relate

| Living Stack Tier | Maps To Layers | Perspective |
|:--|:--|:--|
| Foundation | L1 (Architectures) + L2 (Pre-training, CPT) | "What base model do I choose?" |
| Alignment | L2 (SFT, DPO, LoRA, Distillation) | "How do I customize its behaviour?" |
| Adaptability | L7 (RAG, Agents, MCP, Memory) | "How do I extend it at runtime?" |
| — | L3–L6 (Hardware, Formats, Engines, Tools) | Infrastructure that enables all tiers |

---

## Document Index

### Technology Stack (Layers 1–7)

| # | Document | Topic |
|:--|:--|:--|
| 01 | [Model Architectures](./01-model-architectures.md) | Architectures × paradigms, JEPA, capabilities, inference parameters |
| 02 | [Training & Adaptation](./02-training-adaptation.md) | Pre-training, SFT, RLHF/DPO/GRPO, LoRA/QLoRA, distillation |
| 03 | [Hardware](./03-hardware.md) | CPU, GPU, TPU, LPU, NPU, Apple Silicon, ASIC, Analog AI |
| 04 | [Model Formats](./04-model-formats.md) | Weight/Interchange/Runtime formats, quantisation, deployment |
| 05 | [Inference Engines](./05-inference-engines.md) | llama.cpp, vLLM, SGLang, TGI, TensorRT-LLM, edge runtimes |
| 06 | [Tools & Environments](./06-tools.md) | Model servers, desktop apps, cloud assistants, AI IDEs, CLI agents, no-code |
| 07 | [LLM Extensions](./07-llm-extensions.md) | Agents, MCP, RAG, Memory, Function Calling, A2A |

### Living Stack (Tiers L1–L3)

| # | Document | Topic |
|:--|:--|:--|
| L1 | [Foundation](./L1-foundation.md) | Base models, pre-training, CPT, model selection guide |
| L2 | [Alignment](./L2-alignment.md) | SFT, RLHF, DPO, GRPO, KTO, LoRA/QLoRA, distillation, inference-time scaling |
| L3 | [Adaptability](./L3-adaptability.md) | RAG pipeline, agents, MCP, A2A, memory, RAG vs fine-tuning |

