## 🧱 AI Building Blocks — Overview

> **Main entry point.** Start here for the big picture, then follow links to the deep-dives.

---

## The AI Stack: 7 Layers

```text
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
│      • LoRA / QLoRA — parameter-efficient fine-tuning           │
│      • Post-training Quantization (PTQ)                         │
│                                                                 │
│  2D. Alignment & RL                                             │
│      • RLHF (Human Feedback), RLAIF (AI Feedback)               │
│      • DPO (Direct Preference Optimization)                     │
│      • GRPO (Group Relative Policy Optimization) — reasoning    │
│      • KTO (Kahneman-Tversky Optimization)                      │
│                                                                 │
│  2E. Distillation & Inference-Time Scaling                      │
│      • Knowledge Distillation — teacher to student              │
│      • Inference-Time Scaling — generating longer chains of     │
│        thought (e.g. DeepSeek R1, OpenAI o1/o3)                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3: HARDWARE (The Muscle)                                │
│  → Deep-dive: 03-hardware.md                                   │
│                                                                 │
│  3A. Cloud & Enterprise Data Center                             │
│      • GPUs: NVIDIA H100, B200, AMD MI300X                      │
│      • TPUs: Google TPU v5e/v6e (matrix multiplication)         │
│      • LPUs: Groq (deterministic, SRAM-based, ultra-fast)       │
│                                                                 │
│  3B. Edge & Local Computing                                     │
│      • CPUs: AVX-512, AMX instructions                          │
│      • Apple Silicon: Unified Memory architecture (M1–M4)       │
│      • NPUs: Snapdragon, Intel Core Ultra (local AI PCs)        │
│                                                                 │
│  3C. Analog AI / Neuromorphic (Emerging)                        │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 4: MODEL FORMATS (The Package)                          │
│  → Deep-dive: 04-model-formats.md                              │
│                                                                 │
│  4A. Weight Storage                                             │
│      • Safetensors (standard, zero-copy, secure)                │
│      • PyTorch / Pickle (legacy, insecure)                      │
│                                                                 │
│  4B. Optimization & Quantization                                │
│      • AWQ, GPTQ, EXL2 (GPU-optimized)                          │
│      • GGUF (llama.cpp standard, flexible CPU/GPU)              │
│      • ONNX (cross-platform inference)                          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 5: INFERENCE ENGINES (The Motor)                        │
│  → Deep-dive: 05-inference-engines.md                          │
│                                                                 │
│  5A. High-Throughput / Data Center                              │
│      • vLLM (PagedAttention, multi-LoRA)                        │
│      • SGLang (RadixAttention, ultra-fast generation)           │
│      • TensorRT-LLM (NVIDIA optimized)                          │
│      • TGI (Hugging Face Text Generation Inference)             │
│                                                                 │
│  5B. Local / Edge Computing                                     │
│      • llama.cpp (GGUF, Mac/CPU/GPU)                            │
│      • MLX (Apple Silicon optimized)                            │
│      • ONNX Runtime, WebNN (Browser)                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 6: TOOLS & ENVIRONMENTS (The Interfaces)                │
│  → Deep-dive: 06-tools.md                                      │
│                                                                 │
│  6A. Model Servers                                              │
│      • Ollama, LM Studio, vLLM server                           │
│                                                                 │
│  6B. Desktop / Chat UIs                                         │
│      • Open WebUI, AnythingLLM, LM Studio                       │
│                                                                 │
│  6C. Cloud Platforms                                            │
│      • Hugging Face (Spaces, Hub), Replicate, Together AI       │
│                                                                 │
│  6D. Provider Assistants                                        │
│      • ChatGPT, Claude.ai, Gemini Advanced, DeepSeek            │
│                                                                 │
│  6E. IDEs & Editors                                             │
│      • Cursor, Windsurf, GitHub Copilot, Cline/RooCode          │
│                                                                 │
│  6F. RAG & Workflow UIs                                         │
│      • Dify, Flowise, Langflow                                  │
│                                                                 │
│  6G. CLI / Terminal Agents                                      │
│      • Aider, Fabric                                            │
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

```text
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

```text
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
