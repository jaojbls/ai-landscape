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



# AI Stack Layers

### L1 Model Architectures (Model Architectures & Inference Parameters)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

### 1. How AI Models Are Classified

AI models are classified along **two dimensions**: the neural network **architecture** (what's inside) and the **generative paradigm** (how it produces output).

### At a Glance

| Model Family | Architecture | Generative Paradigm | Examples | Best For |
|:--|:--|:--|:--|:--|
| **Transformer LLMs** | Transformer (decoder-only) | Autoregressive (next token) | GPT-4o, Claude, Llama, Gemini | Chat, code, reasoning |
| **MoE LLMs** | Transformer + expert routing | Autoregressive | Mixtral, DBRX, GPT-4 | Big quality, lower cost |
| **Diffusion (visual)** | U-Net / DiT | Diffusion (denoising) | Stable Diffusion, FLUX, Sora | Image, video, audio |
| **Diffusion LLMs** | Transformer | Discrete diffusion (parallel denoising) | Mercury (Inception Labs) | Chat, code, reasoning |
| **Ternary LLMs** | Transformer (ternary) | Autoregressive | BitNet b1.58 | Ultra-efficient, CPU-only (research) |
| **SSMs** | State Space (Mamba) | Autoregressive | Mamba, RWKV, Jamba | Long sequences, linear scaling |
| **Embedding Models** | Transformer (encoder) | Non-generative (encoding) | BGE, E5, Nomic, text-embedding-3 | RAG, semantic search |
| **Discriminative** | Various (CNN, Transformer) | Non-generative (classification) | BERT, YOLO, ResNet | Detection, classification |
| **JEPA** | Joint Embedding Predictive | Predictive (representation space) | I-JEPA, V-JEPA | World models (research) |

### Capabilities (cross-cutting — can be applied to any architecture)

| Capability | What It Means | Examples |
|:--|:--|:--|
| **Multimodal** | Processes text + image + audio + video natively | GPT-4o, Gemini Ultra, Claude Opus |
| **Reasoning** | Extended chain-of-thought, thinking tokens | DeepSeek-R1, o3, Claude Extended Thinking |
| **Code** | Specialised for programming tasks | Codex, DeepSeek-Coder, StarCoder |
| **Tool Use** | Can invoke external functions/APIs | GPT-4o, Claude, Gemini |

> **💡 Key distinction:** "Multimodal" is a **capability**, not a separate architecture. GPT-4o is a Transformer LLM that *happens to be* multimodal. Stable Diffusion is a diffusion model. They're different architectures that can both be multimodal.

---

### 2. Architecture Deep Dives

### Transformer LLMs (Autoregressive)

The **dominant architecture** behind modern chatbots and coding assistants. Built on the **Transformer** architecture (2017, "Attention Is All You Need"), these models use the **autoregressive** paradigm — predicting the **next token** in a sequence, one at a time, conditioned on all prior tokens.

**How it works:**
```
Input: "The capital of France is"
                                  → predicts "Paris"
                                             → predicts "."
                                                        → predicts [END]
```

**Key characteristics:**
- **Sequential generation** — one token at a time (left-to-right)
- **KV caching** — stores computed attention values to avoid redundant work, making each subsequent token cheaper
- **Context window** — operates within a fixed length (128K–1M+ tokens in 2026)
- **Scaling law** — more parameters + more data = better performance (generally)

**Limitation:** Strict left-to-right generation means the model can't "go back and fix" earlier tokens. It commits to each prediction as it goes.

**Why "Transformer"?** The key innovation is **self-attention** — the ability to weigh the importance of every token relative to every other token, regardless of position. This is what makes LLMs so effective at understanding context.

---

### Diffusion Models

Diffusion models work by **adding noise to data** (forward process) and then learning to **reverse that noise** (denoising process) to create new outputs. Originally developed for images, diffusion is now applied to **video, audio, and text**.

**How it works (visual):**
```
Pure noise → Step 1 (less noisy) → Step 2 → ... → Step N → Clean image
```

**Key characteristics:**
- **Iterative refinement** — quality improves with more denoising steps (more steps = slower but better)
- **Global coherence** — considers the entire output at once, not just left-to-right
- **Classifier-free guidance** — controls how strongly the output follows the text prompt
- **Now applied to video (Sora), audio, and text (Mercury)**

### Diffusion LLMs (dLLMs) — Text Generation via Diffusion

**Mercury** (Inception Labs) is the first production-ready diffusion LLM. Crucially, Mercury still uses a **Transformer architecture** — the same neural network backbone as GPT or Llama. The difference is the **generative paradigm**: instead of autoregressive next-token prediction, it uses discrete diffusion to generate all tokens in parallel and iteratively refine them:

> **💡 Key insight:** Mercury proves that **architecture** and **paradigm** are truly independent axes. The same Transformer can be trained to generate text autoregressively (GPT) or via diffusion (Mercury). The innovation is in *how* the model generates, not *what* the model is.

```
Autoregressive:  token₁ → token₂ → token₃ → ... → tokenₙ   (sequential, ~100 tok/s)
Diffusion:       [noise noise noise ... noise] → refine → refine → [clean text]  (parallel, 1000+ tok/s)
```

**Key advantages over autoregressive:**
- **Speed** — 1,000+ tokens/sec on standard NVIDIA GPUs (5–10x faster)
- **Built-in error correction** — can revise earlier tokens during refinement steps
- **Global coherence** — considers the full output simultaneously, better for constraint satisfaction

**Mercury model family:**

| Model | Focus | Key Feature |
|:--|:--|:--|
| **Mercury** | General chat | First diffusion LLM for conversation |
| **Mercury Coder** | Code generation | Optimised for software development |
| **Mercury 2** | Reasoning | Production agent/RAG loops with real-time latency |
| **Mercury Edit 2** | Code editing | Next-edit prediction, integrated in Zed editor |

> **💡 Why this matters:** Mercury proves that diffusion isn't just for images — it's a viable alternative paradigm for text generation. If diffusion LLMs continue to improve, the autoregressive assumption that dominates the entire LLM ecosystem may not hold forever.

---

### Ternary LLMs (BitNet b1.58)

BitNet b1.58 (Microsoft Research) represents a **fundamentally different approach** to model efficiency. Instead of compressing weights after training (quantisation), BitNet models are **trained from scratch** with ternary weights: every parameter is constrained to **{-1, 0, 1}**.

Why "1.58-bit"? → log₂(3) ≈ 1.58 bits per weight.

**The multiplication-free insight:**
```
Traditional inference:  weight × activation = expensive FP multiply
BitNet inference:       weight ∈ {-1, 0, 1}
                        → -1: negate the activation (subtract)
                        → 0:  skip entirely
                        → 1:  add the activation
                        → No multiplication ever happens
```

**How it differs from quantisation:**

| Aspect | Post-Training Quantisation (GPTQ/AWQ) | BitNet b1.58 |
|:--|:--|:--|
| **When** | After training (compression) | During training (architecture constraint) |
| **Weights** | Compressed floats → INT4/INT8 | Native ternary {-1, 0, 1} |
| **Compute** | Still requires multiplication | **Addition only — no FPU needed** |
| **Quality loss** | Some (especially below Q4) | Minimal — model learns the constraint |
| **Hardware** | Standard GPU/CPU | Could run on CPUs or custom addition-only chips |

**Performance comparison:**

| Metric | Traditional (FP16) | BitNet b1.58 |
|:--|:--|:--|
| Memory per param | 2 bytes | ~0.2 bytes (10x smaller) |
| Core operation | Matrix multiply (FPU) | Addition only |
| Energy | High (GPU-bound) | Dramatically lower |
| Hardware required | GPU preferred | **CPU sufficient** |
| Quality at 3B+ | Baseline | Matches full-precision |

**Current status (2026):** Research stage — no widely-available production models yet. Microsoft released **bitnet.cpp** (see [05-inference-engines.md](./05-inference-engines.md)) as a dedicated inference engine. Matches full-precision quality at 3B+ parameters in benchmarks.

> **💡 Key distinction:** Quantisation is a **compression technique** (see [04-model-formats.md](./04-model-formats.md)). BitNet is an **architecture decision**. Q4_K_M compresses a trained model. BitNet trains a model that's natively tiny. They solve the same problem from opposite directions.

---

### Mixture of Experts (MoE)

MoE is an **architectural pattern** (not a separate model type) where the model contains multiple specialised sub-networks ("experts"), but only activates a **subset** for each input token.

**How it works:**
```
Input token → Router → selects 2 of 8 experts → combines their outputs
```

**Why it matters:**
- A 140B-parameter MoE model might only use ~47B parameters per token (like Mixtral 8x22B)
- This gives you **big-model quality at small-model speed**
- Trade-off: total model file is still large (all experts stored), but inference is fast

**Key models:**
| Model | Experts | Active | Total Params | Active Params |
|:--|:--|:--|:--|:--|
| **Mixtral 8x7B** | 8 | 2 | 47B | ~13B |
| **Mixtral 8x22B** | 8 | 2 | 141B | ~39B |
| **DBRX** | 16 | 4 | 132B | ~36B |
| **GPT-4** (rumoured) | Multiple | Subset | Unknown | Unknown |

**Practical impact:** When you see a model with unusually good performance for its "active" parameter count, it's probably MoE.

---

### State Space Models (SSMs)

SSMs are an **emerging alternative to transformers** that process sequences using mathematical state spaces rather than attention mechanisms.

**Why they're interesting:**
- **Linear scaling** — transformers scale quadratically with sequence length (attention is O(n²)); SSMs scale linearly (O(n))
- **No attention mechanism** — processes sequences through a learned state that evolves over time
- **Very long contexts** — naturally handles extremely long sequences without the memory explosion of attention

**Key models:**
- **Mamba** — the breakthrough SSM architecture (2023), competitive with transformers at scale
- **RWKV** — "Receptance Weighted Key Value," another linear attention alternative
- **Jamba** — AI21's hybrid Mamba + Transformer architecture

**Current status:** SSMs are promising but haven't yet matched transformers at the largest scales. Most production models still use transformers. Watch this space — the next major architecture shift may come from here.

---

### Embedding Models

Embedding models convert text (or images, audio) into **dense numerical vectors** that capture semantic meaning. Two texts with similar meanings will have vectors that are close together in vector space.

**How it works:**
```
"The cat sat on the mat"    → [0.12, -0.34, 0.78, ...]  (768-dim vector)
"A feline rested on a rug"  → [0.11, -0.33, 0.77, ...]  (similar vector!)
"Stock prices rose sharply"  → [0.89, 0.45, -0.12, ...]  (very different vector)
```

**Why they matter:**
- **Foundation of RAG** — your documents get embedded, queries get embedded, and you find relevant docs by vector similarity
- **Semantic search** — find content by meaning, not just keyword matching
- **Clustering & classification** — group similar items without manual labels

**Key models:**
| Model | Dimensions | Source | Best For |
|:--|:--|:--|:--|
| **text-embedding-3-large** | 3072 | OpenAI | General-purpose, high quality |
| **BGE-large-en-v1.5** | 1024 | BAAI | Open-source, strong English |
| **E5-mistral-7b-instruct** | 4096 | Microsoft | Instruction-aware, high quality |
| **Nomic Embed** | 768 | Nomic AI | Lightweight, local-friendly |
| **mxbai-embed-large** | 1024 | Mixedbread | Excellent quality/size ratio |

> **💡 Key insight:** Embedding models are smaller and cheaper than LLMs but equally important for building AI applications. Without good embeddings, RAG doesn't work.

---

### Discriminative Models

These don't generate new content. They **classify, predict, or detect** — answering "what is this?" rather than "create something new."

**Examples in production:**
- Email spam filters (BERT-based classifiers)
- Fraud detection (anomaly detection models)
- Medical imaging diagnostics (ResNet, Vision Transformers)
- Object detection in video (YOLO — real-time, used in self-driving)
- Named Entity Recognition (extracting names, dates, amounts from text)

---

### Multimodal — A Capability, Not an Architecture

Multimodal is the ability to process **multiple input types** (text, image, audio, video) within the same model. It's a **capability** that can be added to any architecture, not a separate architecture class.

**How multimodal works (simplified):**
```
Text  → Text Encoder  ─┐
Image → Vision Encoder ─┼── Fusion Layer → Unified Representation → Output
Audio → Audio Encoder  ─┘
```

**Why it's a capability, not a type:**
- GPT-4o is a **Transformer LLM** that is multimodal
- Stable Diffusion is a **diffusion model** that takes text input (also multimodal)
- Gemini Ultra is a **Transformer LLM + MoE** that is multimodal
- The underlying architecture varies — the multimodal capability is bolted on via additional encoders

**Key multimodal models:**
- **GPT-4o** — natively multimodal Transformer LLM (text, image, audio, video in/out)
- **Gemini Ultra** — Google's multimodal Transformer LLM, all modalities
- **Claude Opus** — text + image input, strong reasoning over visual content

**Modern approach:** Early multimodal systems were separate models piped together. Today's models are trained **end-to-end** with fused encoders — the vision and audio capabilities are baked in from training, not added after.

---

### JEPA & World Models (Emerging)

**JEPA (Joint Embedding Predictive Architecture)** is Yann LeCun's (Meta/FAIR) proposed alternative to both autoregressive and diffusion paradigms. It represents a fundamentally different generative paradigm.

**How JEPA differs:**
```
Autoregressive:  Predict the next TOKEN (surface level)
Diffusion:       Denoise PIXELS (surface level)
JEPA:            Predict REPRESENTATIONS (abstract level)
```

Instead of predicting tokens or pixels, JEPA predicts in an **abstract representation space** — it learns *concepts* and *relationships*, not surface patterns.

**Key characteristics:**
- **Self-supervised** — learns from data without labels
- **Predicts abstractions** — operates in latent space, not pixel/token space
- **Avoids generative collapse** — doesn't need to reconstruct every detail, only what matters
- **Foundation for world models** — learns how things relate, not just what they look like

**Released models:**
| Model | Domain | What It Does |
|:--|:--|:--|
| **I-JEPA** | Images | Predicts missing image regions in representation space (not pixels) |
| **V-JEPA** | Video | Predicts future video frames in representation space |

**LeCun's broader vision — World Models:**
JEPA is a building block toward LeCun's vision of **autonomous machine intelligence**:

```
World Model (understands how the world works)
    +
Cost Function (evaluates outcomes)
    +
Actor (takes actions to minimise cost)
    =
Autonomous AI (plans, reasons, acts — not just predicts tokens)
```

LeCun argues that autoregressive LLMs are fundamentally limited — they predict text, not *understand* the world. JEPA-style architectures aim to build genuine understanding.

**Current status:** Research stage. No production models you can run today. But this may represent the **next paradigm shift** in AI — moving from token prediction to world understanding.

> **💡 Why this matters:** If LeCun is right, the entire stack we describe in these docs (Transformer LLMs → fine-tuning → inference engines → tools) represents the *current* era. JEPA points toward a possible future era with fundamentally different architectures.

---

### 3. The 2026 Trend: Model Routing

Modern AI systems no longer rely on a single model. Instead, they use **model routing** — automatically selecting the best model for each request based on complexity, cost, and speed requirements.

```
User Request → Router
                 ├── Simple query        → Small model (fast, $0.001)
                 ├── Code generation     → Specialised code model
                 ├── Complex reasoning   → Large "thinking" model (slow, $0.05)
                 └── Image generation    → Diffusion model
```

**Why it matters:**
- **Cost:** Simple questions don't need a $0.05/query reasoning model
- **Speed:** Small models respond in milliseconds
- **Quality:** Complex tasks still get the best model available

This is sometimes called "model portfolio management" — treating your AI models like a portfolio of tools, not a single monolithic brain.

---

### 4. Inference Parameters — Tweaking Model Behaviour

Inference parameters control **how** a model generates output. They don't change the model itself — they shape its behaviour during real-time generation.

### Core Sampling Parameters

| Parameter | What It Controls | Range | Default | When to Adjust |
|:--|:--|:--|:--|:--|
| **Temperature** | Randomness / creativity | 0.0 (deterministic) → 2.0 (very random) | ~0.7–1.0 | Low (0.0–0.2) for code, facts. High (0.8–1.2) for creative writing |
| **Top-P (Nucleus)** | Cumulative probability cutoff | 0.0 → 1.0 | ~0.9–1.0 | Alternative to temperature. Lower = more focused |
| **Top-K** | Max candidate tokens per step | 1 → vocab size | ~40–50 | Lower = narrower, more predictable |

> **⚠️ Best Practice:** Don't tune Temperature and Top-P simultaneously. Pick one and keep the other at default. Adjusting both creates unpredictable interactions.

### Repetition & Diversity Controls

| Parameter | What It Controls | How It Works |
|:--|:--|:--|
| **Frequency Penalty** | Reduces repeated tokens **proportionally** | More appearances = stronger penalty |
| **Presence Penalty** | Flat penalty for **any** previously used token | Encourages introducing new topics |
| **Repetition Penalty** | Broader loop prevention | Prevents infinite loops in some frameworks |

### Output Control

| Parameter | Purpose | Example |
|:--|:--|:--|
| **Max Tokens** | Hard cap on response length | 4096 for long-form, 256 for summaries |
| **Stop Sequences** | Strings that halt generation | `"\n\n"`, `"[END]"`, `"User:"` |
| **Seed** | Reproducibility | Set to any integer for consistent outputs |

> **💡 Reasoning Models Note:** For modern "thinking" models (o1, Claude with extended thinking), lowering temperature doesn't make them smarter — their internal chain-of-thought already handles accuracy. Temperature mostly affects surface phrasing.

### Quick Reference: Parameter Recipes

| Use Case | Temperature | Top-P | Freq. Penalty | Max Tokens |
|:--|:--|:--|:--|:--|
| **Code generation** | 0.0–0.2 | 1.0 | 0.0 | 4096+ |
| **Factual Q&A** | 0.0–0.3 | 0.9 | 0.0 | 1024 |
| **Creative writing** | 0.8–1.2 | 0.95 | 0.3–0.5 | 4096+ |
| **Brainstorming** | 1.0–1.5 | 1.0 | 0.5–0.8 | 2048 |
| **Data extraction** | 0.0 | 1.0 | 0.0 | 1024 |


### L2 Training & Adaptation (Training & Adaptation)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)
>
> **📌 Decision guidance:** For when/why to choose between techniques, see the Living Stack: [L2-alignment.md](./L2-alignment.md)

---

### 1. Why This Layer Matters

When you see "Llama 3.1 70B Instruct" on Hugging Face, that name encodes a journey:

- **Llama 3.1** → Base model (pre-trained on trillions of tokens)
- **70B** → 70 billion parameters
- **Instruct** → Fine-tuned to follow instructions (SFT + RLHF)

Understanding how models get from "raw weights" to "useful assistant" explains why there are 50+ variants of the same base model and what "fine-tuned for chat" actually means.

---

### 2. The Training Pipeline

```
Pre-training  →  Continued Pre-training  →  SFT  →  Alignment (DPO/RLHF)  →  Quantise  →  Deploy
($$$ labs)        (optional, domain)         (format)   (preferences)           (compress)    (serve)
```

---

### 3. Pre-Training (From Scratch)

The model reads trillions of tokens (web, books, code, papers) and learns to predict the next token. No human labels — pure pattern learning.

| Model | Training Data | Estimated Cost | Who |
|:--|:--|:--|:--|
| GPT-4 | ~13T tokens | ~$100M+ | OpenAI |
| Llama 3.1 405B | 15T tokens | ~$50M+ | Meta |

**Output:** A "base model" — can complete text but doesn't know how to have a conversation. Only labs do this.

---

### 4. Continued Pre-Training (CPT)

Additional training on domain-specific data to make a general model into a specialist (legal, medical, finance).

**Danger — Catastrophic Forgetting:** The model may "forget" general knowledge. Mitigated via replay buffers, knowledge distillation, and gradual learning rates.

---

### 5. Supervised Fine-Tuning (SFT)

SFT teaches the model **how to behave** — following instructions, conversation format, tone, and style.

- Humans write thousands of example conversations
- The model learns to match this format
- Output: An "Instruct" or "Chat" model (the version you actually use)
- Scale: 10K–100K high-quality examples. Quality > quantity.

---

### 6. Preference Optimisation

After SFT, preference optimisation teaches the model which responses humans **prefer**.

### RLHF (Reinforcement Learning from Human Feedback)

Classic approach: generate two responses → human ranks them → train a reward model → optimise via PPO. Complex but proven (used by OpenAI, Anthropic).

### DPO (Direct Preference Optimisation)

Simpler: directly optimise on (prompt, good_response, bad_response) pairs. No reward model needed. Now the most common method for open-source models.

### GRPO (Group Relative Policy Optimisation)

Newest: generate multiple responses, score them with verifiable rewards (math/code correctness), optimise to produce higher-ranked responses. Used by DeepSeek-R1.

| Method | Complexity | Needs Reward Model | Used By |
|:--|:--|:--|:--|
| **RLHF** | High | Yes | OpenAI, Anthropic |
| **DPO** | Medium | No | Most OSS models |
| **GRPO** | Medium | No | DeepSeek, emerging |

---

### 7. LoRA & QLoRA — Accessible Fine-Tuning

Full fine-tuning changes all parameters — requires massive GPU resources. LoRA makes it accessible.

### LoRA (Low-Rank Adaptation)

Freezes the original model and adds **small trainable adapter matrices** (~0.1% of params):

- Fine-tune a 70B model on a **single GPU** (24 GB VRAM)
- Adapter files are tiny (10–100 MB vs 140 GB model)
- Swap adapters: same base model, different specialisations
- Can merge adapters back into base model for deployment

### QLoRA

Goes further: quantise the base model to 4-bit during training, then apply LoRA on top. Fine-tune 70B on a single RTX 4090.

> **💡 LoRA is to AI what Docker was to deployment — it democratised something previously accessible only to large organisations.**

---

### 8. Distillation

Transfers knowledge from a **large "teacher" model** to a **smaller "student" model**.

The student gets 80–90% of the teacher's quality at 1/50th the cost. This is how most small open-source models get their quality (e.g., DeepSeek-R1-Distill, Llama 3.1 8B benefits from 405B's training data).

---

### 9. Inference-Time Scaling (2026 Frontier)

Instead of making models bigger, give them **more time to think** at inference.

- **Chain-of-Thought:** Model "thinks out loud" before answering (dramatically improves reasoning)
- **Thinking Tokens:** Internal reasoning the user doesn't see (o1, Claude Extended Thinking, DeepSeek-R1)
- **Test-Time Compute:** Spending more compute at inference can substitute for a bigger model

The 2026 frontier isn't just bigger models — it's smarter inference.

---

### 10. What You Can Do as a Practitioner

| Technique | Accessibility | When to Use |
|:--|:--|:--|
| **Prompt engineering** | ✅ Free, immediate | Always — the first tool to reach for |
| **RAG** | ✅ Your data, no model changes | When you need private/current knowledge |
| **LoRA/QLoRA fine-tuning** | ✅ Consumer GPU | Teaching style, format, or domain expertise |
| **Distillation** | ⚠️ Needs teacher model access | Building a production-grade small model |
| **CPT** | ⚠️ Significant resources | Deep domain specialisation |
| **Pre-training** | ❌ Labs only | You won't do this |


### L3 Hardware (Processing Hardware)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

### 1. Why Hardware Matters

AI workloads are fundamentally different from traditional computing. They're dominated by **matrix multiplication** — billions of multiply-and-accumulate operations — which is why specialised processors exist.

The hardware you choose determines:
- **What models you can run** (a 70B model needs ~40 GB of memory)
- **How fast they run** (tokens per second)
- **What it costs** (cloud GPU vs local inference)

---

### 2. Processor Types

### At a Glance

| Processor | Full Name | Role | Vendor(s) | Best For |
|:--|:--|:--|:--|:--|
| **CPU** | Central Processing Unit | General compute + inference | Intel, AMD, Apple, ARM | GGUF inference (no GPU), lightweight models |
| **GPU** | Graphics Processing Unit | Training + inference | NVIDIA, AMD, Intel | Cloud training, batch inference, heavy workloads |
| **TPU** | Tensor Processing Unit | Cloud ML at scale | Google | Google Cloud AI, large-scale training |
| **LPU** | Language Processing Unit | Ultra-fast LLM inference | Groq | Real-time chatbots, lowest latency |
| **NPU** | Neural Processing Unit | On-device AI | Qualcomm, Intel, Apple, MediaTek | Phones, laptops, IoT, edge devices |
| **Apple Silicon** | M-series SoC (UMA) | Local inference | Apple | MacBook/Mac Studio local AI |
| **ASIC** | Application-Specific IC | Specialised cloud inference | AWS (Inferentia/Trainium), Cerebras | Cloud inference at scale |
| **Analog AI** | Analog compute-in-memory | Ultra-low power edge | Mythic | Robotics, defense, extreme edge |

---

### CPU — The Universal Fallback

CPUs are **not optimal** for AI, but they're **everywhere** and increasingly capable for inference:

- **GGUF models run well on CPU** — llama.cpp was designed for CPU-first inference
- Modern CPUs with AVX-512 or AMX instructions handle matrix ops reasonably well
- **When to use:** No GPU available, small models (≤13B), or as a fallback

| Vendor | AI-Relevant Tech |
|:--|:--|
| Intel | AMX (Advanced Matrix Extensions), NPU in Core Ultra |
| AMD | AVX-512, XDNA NPU in Ryzen AI |
| Apple | Accelerate framework, built-in ML compute |
| ARM | SVE2, Neoverse for server inference |

---

### GPU — The Workhorse

GPUs are the **primary hardware for both training and inference**. Their massive parallelism (thousands of cores) is ideal for matrix multiplication.

#### NVIDIA — The Dominant Force

NVIDIA controls ~80%+ of the AI GPU market. Key product lines:

| Tier | Products | VRAM | Best For |
|:--|:--|:--|:--|
| **Consumer** | RTX 4090, RTX 5090 | 24 GB | Local inference, LoRA fine-tuning |
| **Prosumer** | RTX 6000 Ada | 48 GB | Larger models, professional workloads |
| **Data Centre** | A100, H100, H200, B200 | 40–192 GB | Training, production inference |
| **Next-Gen** | GB200 (Grace Blackwell) | 192 GB HBM3e | Frontier training |

**Key NVIDIA technologies:**
- **CUDA** — The programming model everything is built on
- **Tensor Cores** — Dedicated matrix multiplication hardware
- **NVLink** — High-speed GPU-to-GPU interconnect for multi-GPU setups
- **TensorRT** — Optimised inference engine

#### AMD — The Challenger

| Tier | Products | VRAM | Notes |
|:--|:--|:--|:--|
| **Consumer** | RX 7900 XTX | 24 GB | ROCm support improving |
| **Data Centre** | MI300X | 192 GB HBM3 | Competitive with H100 |
| **Advantage** | — | — | Often cheaper per GB of VRAM |

**Limitation:** Software ecosystem (ROCm) is less mature than CUDA. Not all frameworks have first-class AMD support.

#### Intel Arc

Intel is entering the discrete GPU space with Arc. AI support via oneAPI is emerging but not yet competitive for serious AI workloads.

---

### TPU — Google's Custom Silicon

Google's Tensor Processing Units are **cloud-only** processors designed specifically for ML workloads.

- Available exclusively through **Google Cloud**
- Optimised for large-scale training and inference
- Used internally by Google for Gemini, Search, YouTube recommendations
- TPU v5e and v5p are the current generation
- **Best for:** Teams already in the Google Cloud ecosystem

---

### LPU — Groq's Language Processor

Groq's Language Processing Unit takes a radically different approach: **deterministic, no-cache architecture** optimised specifically for sequential token generation.

- **Record-breaking speed:** 500+ tokens/second for Llama 70B
- **Deterministic latency:** Every token takes the same time (no variance)
- **Cloud API only:** No hardware for purchase — access via Groq Cloud
- **Trade-off:** Optimised for inference only (not training), limited batch sizes

---

### NPU — Neural Processing Units

Dedicated low-power AI accelerators built **into consumer chips**:

| Vendor | NPU | Found In |
|:--|:--|:--|
| Qualcomm | Hexagon | Snapdragon phones, Windows ARM laptops |
| Intel | AI Boost | Core Ultra laptops |
| Apple | Neural Engine | iPhones, iPads, Macs (16–38 TOPS) |
| MediaTek | APU | Android phones |
| AMD | XDNA | Ryzen AI laptops |

**What NPUs do:** Handle lightweight AI tasks (voice recognition, photo enhancement, real-time translation) locally without draining the battery.

**What NPUs don't do:** Run large LLMs. They're designed for small, optimised models (via CoreML, TFLite, QNN formats).

---

### Apple Silicon — The Unified Memory Advantage

Apple's M-series chips deserve special attention because of **Unified Memory Architecture (UMA)**:

```
Traditional (discrete GPU):          Apple Silicon (UMA):
┌─────────┐    ┌─────────┐          ┌─────────────────────┐
│   CPU   │◄──►│   GPU   │          │  CPU + GPU + NPU    │
│  RAM    │    │  VRAM   │          │  Shared Memory Pool  │
│ (64 GB) │    │ (24 GB) │          │  (up to 512 GB)     │
└─────────┘    └─────────┘          └─────────────────────┘
  Model must fit in VRAM (24 GB)      Model can use ALL memory
```

**Why this matters for AI:**
- A Mac Studio with 192 GB can run a 70B model in GGUF Q4_K_M entirely in memory
- No GPU VRAM bottleneck — the model uses the full unified memory pool
- Metal framework provides GPU acceleration for inference

| Chip | Max Memory | Memory Bandwidth | Ideal Model Size |
|:--|:--|:--|:--|
| M4 | 32 GB | 120 GB/s | Up to ~14B Q4 |
| M4 Pro | 48 GB | 273 GB/s | Up to ~30B Q4 |
| M4 Max | 128 GB | 546 GB/s | Up to ~70B Q4 |
| M4 Ultra | 512 GB | 819 GB/s | 70B+ full precision |

> **⚠️ Performance is memory-bandwidth bound**, not memory-size bound. An M4 Max with 128 GB will run a 70B model **faster** than an M4 with 32 GB (even ignoring the size), because bandwidth determines tokens-per-second.

---

### ASIC Inference Chips

Purpose-built chips for cloud inference at scale:

| Chip | Vendor | Best For |
|:--|:--|:--|
| **Inferentia2** | AWS | Cost-efficient inference on AWS |
| **Trainium2** | AWS | Training on AWS |
| **Cerebras WSE-3** | Cerebras | Wafer-scale, massive single-chip models |

These are cloud-only and managed by the vendor — you use them via cloud APIs, not directly.

---

### Analog AI — The Frontier

Mythic's approach: perform matrix multiplication **in the analog domain** using flash memory cells as resistors.

- **Extreme efficiency:** ~10x more power-efficient than digital for inference
- **Trade-off:** Lower precision, harder to program
- **Status:** Niche — primarily defense and edge robotics applications
- **Why it matters:** Points toward a future where AI inference is nearly free at the edge

---

### 3. Hardware Decision Flowchart

```
What are you doing?
│
├── Training a model?
│   └── GPU (NVIDIA H100/B200) or Cloud TPU
│
├── Running inference?
│   ├── Cloud / high throughput?
│   │   ├── Lowest latency? → LPU (Groq)
│   │   ├── NVIDIA ecosystem? → GPU + TensorRT
│   │   └── AWS? → Inferentia2
│   │
│   ├── Local machine?
│   │   ├── macOS? → Apple Silicon (GGUF + Metal)
│   │   ├── Linux/Windows with NVIDIA? → GPU (GGUF + CUDA)
│   │   └── No GPU? → CPU (GGUF via llama.cpp)
│   │
│   └── Edge / IoT?
│       ├── Phone? → NPU (CoreML / TFLite / QNN)
│       └── Ultra-low power? → Analog AI
│
└── Fine-tuning?
    ├── LoRA/QLoRA? → Single GPU (RTX 4090, 24 GB)
    └── Full fine-tune? → Multi-GPU (A100/H100 cluster)
```


### L4 Model Formats (Model Formats & Quantisation)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

### 1. What Is a Model Format?

A trained AI model is a massive collection of numbers (weights). A **model format** defines how those weights — and optionally the architecture, tokeniser, and metadata — are serialised to disk.

The format you choose affects:
- **Where** you can run the model (which hardware/frameworks)
- **How fast** it loads and runs
- **How safe** it is (can it execute arbitrary code?)
- **How portable** it is (can you move between environments?)

---

### 2. Three Categories of Formats

### Category 1: Weight Formats (Storage)

These store the **raw numbers** — the learned parameters of a model.

| Format | Extension | What It Stores | Security | Created By |
|:--|:--|:--|:--|:--|
| **SafeTensors** | `.safetensors` | Weights + JSON metadata header | ✅ No executable code | Hugging Face |
| **GGUF** | `.gguf` | Weights + tokeniser + architecture + metadata (single file) | ✅ Safe binary | llama.cpp community |
| **PyTorch Pickle** | `.pt` / `.pth` / `.bin` | Weights via Python's pickle | ❌ **Arbitrary code execution risk** | Meta (PyTorch) |

**SafeTensors** is the default for sharing models. **GGUF** is the default for running locally. **PyTorch Pickle** is legacy — never load from untrusted sources.

### Category 2: Interchange Formats (Portability)

These store both weights AND the computation graph, enabling cross-platform deployment.

| Format | Extension | What It Stores | Created By |
|:--|:--|:--|:--|
| **ONNX** | `.onnx` | Weights + full computation graph | Microsoft, Meta, others |

ONNX is the "universal translator" — train in PyTorch, export to ONNX, run in C++, C#, Java, JavaScript, or any language with ONNX Runtime.

### Category 3: Runtime Formats (Performance)

Vendor-specific formats optimised for **maximum speed** on specific hardware. You convert to these from universal formats.

| Format | Extension | Vendor | Target Hardware | Converts From |
|:--|:--|:--|:--|:--|
| **TensorRT** | `.engine` / `.plan` | NVIDIA | NVIDIA GPUs | ONNX, PyTorch |
| **CoreML** | `.mlpackage` / `.mlmodel` | Apple | Apple Silicon (NPU+GPU+CPU) | ONNX, PyTorch, TF |
| **OpenVINO IR** | `.xml` + `.bin` | Intel | Intel CPUs, NPUs, GPUs | ONNX, PyTorch, TF |
| **TFLite** | `.tflite` | Google | Mobile, edge, Coral TPU | TensorFlow, ONNX |
| **MLX** | `.npz` / `.safetensors` | Apple | Apple Silicon (research) | SafeTensors, PyTorch |
| **QNN** | `.bin` | Qualcomm | Snapdragon NPUs | ONNX |

> **💡 Universal formats = portability. Runtime formats = performance.** The pipeline is: Train → export to ONNX/SafeTensors → convert to vendor format.

---

### 3. When to Use Each Format

| Scenario | Format | Why |
|:--|:--|:--|
| Running locally on your machine | **GGUF** | Self-contained, quantised, works with Ollama/LM Studio |
| Sharing a model on Hugging Face | **SafeTensors** | Safe, fast loading, community standard |
| Production API on NVIDIA GPUs | **ONNX → TensorRT** | Maximum inference speed |
| iOS / macOS app | **ONNX → CoreML** | Native Apple integration |
| Intel servers | **ONNX → OpenVINO** | Optimised for Intel silicon |
| Android app | **TF → TFLite** | Ultra-lightweight mobile |
| ML research on Mac | **MLX** | Python-native, Apple Silicon optimised |
| Qualcomm phones/IoT | **ONNX → QNN** | Hexagon DSP acceleration |

---

### 4. The Conversion Pipeline

```
Training Output (PyTorch / SafeTensors)
    │
    ├── Direct use ──────────────────── SafeTensors (sharing, fine-tuning)
    ├── Quantise via llama.cpp ──────── GGUF (local inference)
    ├── Convert via mlx-lm ──────────── MLX (Apple Silicon research)
    └── Export to ONNX ─────────────── ONNX (cross-platform)
            │
            ├── NVIDIA: trtexec ─────── TensorRT (.engine)
            ├── Apple: coremltools ──── CoreML (.mlpackage)
            ├── Intel: Model Optimizer ─ OpenVINO IR (.xml+.bin)
            ├── Google: TFLite converter TFLite (.tflite)
            └── Qualcomm: QNN SDK ───── QNN (.bin)
```

> **Vendor formats are one-way.** Once converted to TensorRT or CoreML, you don't convert back. Always keep the ONNX/SafeTensors source.

---

### 5. Quantisation

Quantisation reduces the **numerical precision** of model weights (e.g., 16-bit floats → 4-bit integers) to shrink size and speed up inference.

### Quantisation Levels (GGUF)

| Level | Bits | Size vs FP16 | Quality Impact | Recommended For |
|:--|:--|:--|:--|:--|
| **FP16** | 16-bit | 100% (baseline) | None — full precision | Training, reference benchmarks |
| **Q8_0** | 8-bit | ~50% | 🟢 Negligible | Maximum quality at reduced size |
| **Q6_K** | 6-bit | ~45% | 🟢 Near-lossless | When memory comfortably allows |
| **Q5_K_M** | 5-bit | ~35% | 🟢 Minimal degradation | Quality-critical production |
| **Q4_K_M** | 4-bit | **~25%** | **🟢 Minor (2–8%)** | **⭐ Default recommendation** |
| **Q3_K_L** | 3-bit | ~18% | 🟠 Noticeable | Memory-constrained experiments |
| **Q2_K** | 2-bit | ~13% | 🔴 Significant loss | Proof-of-concept only |

> **⭐ Start with Q4_K_M** — ~75% size reduction, minor quality loss. Move to Q5_K_M if you have ample memory.

### Quantisation Methods (GPU-focused)

When downloading quantised models from Hugging Face, you'll see different method names:

| Method | Target | How It Works | Quality |
|:--|:--|:--|:--|
| **GPTQ** | GPU | Post-training quantisation using calibration data | Good — the original standard |
| **AWQ** | GPU | Activation-aware — protects important weights | Better than GPTQ at same bits |
| **EXL2** | GPU (ExLlama) | Variable bits per layer — smart allocation | Best quality, ExLlama-specific |
| **GGUF K-quants** | CPU/Metal/CUDA | K-means clustering per block | Excellent — most versatile |
| **BitsAndBytes** | GPU (HF Transformers) | Runtime quantisation, used for QLoRA | Good — no calibration needed |

**Quick guide:** GGUF for local, AWQ/GPTQ for GPU servers, EXL2 if using ExLlamaV2, BitsAndBytes for QLoRA fine-tuning.

### Importance Matrix (imatrix)

For aggressive quantisation (Q4 and below), an **importance matrix** identifies which weights matter most and keeps those at higher precision. Look for "imatrix" GGUF files on Hugging Face — they're higher quality at the same bit-width.

---

> **💡 Looking for 1.58-bit / BitNet b1.58?** That's an architecture decision, not a format or quantisation method. BitNet models are trained from scratch with ternary weights — see [01-model-architectures.md](./01-model-architectures.md) for the full deep-dive.

---

### 6. Hardware Compatibility Matrix

| Format | CPU | NVIDIA GPU | AMD GPU | Apple Silicon | Google TPU | NPU / Edge |
|:--|:--|:--|:--|:--|:--|:--|
| **GGUF** | ✅ Primary | ✅ CUDA offload | ✅ ROCm | ✅ Metal | ❌ | ⚠️ Limited |
| **SafeTensors** | ✅ via framework | ✅ via framework | ✅ via PyTorch | ✅ via MLX | ✅ via JAX | ⚠️ |
| **ONNX** | ✅ ONNX Runtime | ✅ → TensorRT | ✅ MIGraphX | ✅ → CoreML | ❌ | ✅ → OpenVINO/QNN |
| **TensorRT** | ❌ | ✅ Native | ❌ | ❌ | ❌ | ❌ |
| **CoreML** | ❌ | ❌ | ❌ | ✅ Native | ❌ | ❌ |
| **OpenVINO** | ✅ Intel CPUs | ❌ | ❌ | ❌ | ❌ | ✅ Intel NPUs |
| **TFLite** | ✅ Limited | ❌ | ❌ | ❌ | ✅ Coral TPU | ✅ Mobile NPUs |
| **MLX** | ❌ | ❌ | ❌ | ✅ Native | ❌ | ❌ |

---

### 7. Production Deployment

### Deployment Checklist

1. **Memory budgeting** — Keep model under **~60% of available memory** (reserve for KV cache, OS, concurrent requests)
2. **Containerise** — Docker wraps engine + model for consistency
3. **Monitor:** TTFT (time-to-first-token), TPS (tokens/second), memory utilisation, error rates
4. **Scaling:** Vertical (bigger machine) or horizontal (load balancer + multiple instances)

### Apple Silicon Tips

- Enable **Metal acceleration** (automatic in Ollama)
- Performance is **memory-bandwidth bound** — M4 Max/Ultra >> M4 for tokens/second
- Monitor memory pressure via Activity Monitor
- Use Q4_K_M default; Q5_K_M if memory allows

### Quick Decision

```
Deployment target?
├── Local dev / prototype      → GGUF via Ollama
├── Cloud API (NVIDIA)         → ONNX → TensorRT
├── Cloud API (Intel)          → ONNX → OpenVINO
├── Cloud API (diverse)        → ONNX via ONNX Runtime
├── HF ecosystem              → SafeTensors via vLLM/TGI
├── iOS / macOS app           → ONNX → CoreML
├── Android / mobile          → TF → TFLite
└── Edge IoT (Qualcomm)       → ONNX → QNN
```


### L5 Inference Engines (Inference Engines)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

### 1. What Is an Inference Engine?

An inference engine is the **software that loads a model and runs it** — feeding in prompts, computing token predictions, and returning responses. It's the layer between the model file on disk and the user-facing tool you interact with.

**Key distinction:**
```
Inference Engine (runs the model)     User-Facing Tool (you interact with)
─────────────────────────────────     ────────────────────────────────────
llama.cpp                        ←── Ollama, LM Studio, GPT4All
vLLM                             ←── API server, Open WebUI
CoreML Runtime                   ←── iOS/macOS apps
TensorRT-LLM                    ←── NVIDIA Triton, cloud APIs
```

Understanding this separation helps you make better deployment decisions — the engine determines **performance**, the tool determines **experience**.

---

### 2. Local Inference Engines

### llama.cpp — The Foundation

The most important inference engine in the local AI ecosystem. Written in C/C++, it's what powers Ollama, LM Studio, and most local AI tools.

**Key features:**
- **CPU-first design** — runs on any machine, no GPU required
- **GPU offloading** — can offload layers to NVIDIA (CUDA), AMD (ROCm), or Apple (Metal)
- **GGUF format** — the native format, with built-in quantisation support
- **Minimal dependencies** — single binary, no Python/PyTorch needed
- **OpenAI-compatible server** — built-in HTTP server mode

**Why it matters:** If you're running a model locally on consumer hardware, llama.cpp (or something built on it) is almost certainly doing the work.

```bash
# Direct usage (most people use Ollama instead)
./llama-server -m model.gguf --port 8080
```

---

### MLX — Apple's Research Engine

Apple's own ML framework, designed specifically for Apple Silicon:

- **Python-native** — feels like PyTorch but optimised for M-series chips
- **Lazy evaluation** — computations only run when results are needed
- **Unified memory aware** — takes full advantage of UMA
- **Growing model support** — Hugging Face has an `mlx-community` with converted models

**Best for:** ML researchers on Mac who want a PyTorch-like experience without the overhead. Not yet mainstream for end-user inference (llama.cpp is faster for GGUF).

---

### ExLlamaV2

Specialised engine for **GPU inference with EXL2 quantised models**:

- **Fastest GPTQ/EXL2 inference** available
- GPU-only (no CPU support)
- Variable quantisation per layer (e.g., important layers at 6-bit, less important at 3-bit)
- Popular in the r/LocalLLaMA community

---

### bitnet.cpp — 1.58-Bit Inference

Microsoft's inference engine purpose-built for **BitNet b1.58 ternary models** (see [01-model-architectures.md](./01-model-architectures.md)):

- **Addition-only compute** — no floating-point multiplication needed
- **CPU-native** — designed to run efficiently without any GPU
- **Dramatically lower energy** — potential for LLMs on battery-powered devices
- **Research stage** — pairs exclusively with BitNet b1.58 models

**Why it's different:** Every other engine on this page runs standard float/int models. bitnet.cpp runs ternary {-1, 0, 1} models where inference is pure addition.

---

### 3. Server / Cloud Engines

### vLLM — The High-Throughput Standard

The go-to engine for serving LLMs at scale in production.

**Key innovation — PagedAttention:**
- Traditional inference wastes memory by pre-allocating KV cache for the maximum sequence length
- vLLM manages KV cache like virtual memory pages — allocates on demand
- Result: **2–4x higher throughput** than naive serving

**Features:**
- OpenAI-compatible API
- Continuous batching (serves multiple requests simultaneously)
- Supports NVIDIA, AMD, and TPU
- Native support for SafeTensors, GPTQ, AWQ models

**Best for:** Production API servers handling many concurrent users.

---

### SGLang — Structured Generation

Optimised for structured outputs (JSON, function calling, constrained generation):

- **RadixAttention** — caches and reuses common prompt prefixes across requests
- Excellent for agentic workloads where many requests share similar system prompts
- Competitive throughput with vLLM, sometimes faster for structured tasks

---

### TGI (Text Generation Inference) — Hugging Face's Engine

Hugging Face's production inference server:

- Tight integration with the Hugging Face ecosystem
- Supports tensor parallelism (split model across multiple GPUs)
- Flash Attention for faster inference
- Production-ready with built-in health checks and metrics

---

### TensorRT-LLM — NVIDIA's Performance Engine

NVIDIA's inference engine for maximum performance on NVIDIA hardware:

- Uses TensorRT optimisations (layer fusion, kernel auto-tuning)
- Inflight batching for high throughput
- FP8 quantisation support on Hopper GPUs (H100+)
- **Best for:** Maximum tokens/second on NVIDIA GPUs, enterprise deployments

---

### Triton Inference Server

NVIDIA's model-serving platform — a layer above TensorRT-LLM:

- Serves multiple models simultaneously
- Dynamic batching across model types
- Supports multiple backends (TensorRT, ONNX, PyTorch)
- Enterprise-grade monitoring and scaling

---

### 4. Cross-Platform Engines

### ONNX Runtime — The Universal Engine

Microsoft's cross-platform inference runtime. Unlike other engines that target a specific niche (llama.cpp → local LLMs, vLLM → GPU servers), ONNX Runtime runs **everywhere**:

- **Built into Windows** — powers Windows ML and DirectML GPU acceleration
- **Azure ML** — default inference backend for Azure-deployed models
- **Hugging Face Optimum** — accelerated inference via ONNX Runtime backend
- **Browser inference** — ONNX Runtime Web runs models in-browser via WebAssembly/WebGPU
- **Widest language support** — C++, C#, Java, Python, JavaScript, Swift
- **Hardware agnostic** — CPU, NVIDIA GPU, AMD GPU, Intel NPU, Qualcomm NPU, Apple CoreML

**Why it's less visible in the LLM space:** ONNX Runtime dominates traditional ML (classification, object detection, NLP) and smaller transformer models. For 70B+ LLM inference, llama.cpp and vLLM are more optimised. But for cross-platform deployment of smaller models, nothing matches ONNX Runtime's reach.

> **💡 Key insight:** ONNX Runtime is probably the most widely *deployed* inference engine in the world (it ships with every Windows installation), but the least talked about in LLM circles because LLM developers gravitate toward specialised engines.

---

### 5. Edge / Mobile Runtimes

These execute small, optimised models on devices with limited compute:

| Runtime | Vendor | Target | Executes |
|:--|:--|:--|:--|
| **CoreML Runtime** | Apple | iPhone, iPad, Mac | CoreML models using Neural Engine + GPU |
| **TFLite Runtime** | Google | Android, embedded | TFLite models on CPU, GPU, NPU |
| **QNN Runtime** | Qualcomm | Snapdragon devices | QNN models on Hexagon DSP |

**Common pattern:** Voice assistants, on-device translation, photo enhancement, real-time camera effects.

---

### 6. Engine Comparison

| Engine | Target | Best For | Throughput | Complexity |
|:--|:--|:--|:--|:--|
| **llama.cpp** | Local (CPU/GPU) | Personal use, prototyping | Medium | Low |
| **ExLlamaV2** | Local (GPU) | GPU power users, EXL2 models | High | Medium |
| **MLX** | Local (Apple) | Mac ML research | Medium | Low |
| **vLLM** | Server | Production APIs, high concurrency | Very High | Medium |
| **SGLang** | Server | Structured/agentic workloads | Very High | Medium |
| **TGI** | Server | HF ecosystem production | High | Medium |
| **TensorRT-LLM** | Server (NVIDIA) | Maximum NVIDIA performance | Highest | High |
| **Triton** | Server (NVIDIA) | Multi-model enterprise serving | Highest | High |
| **ONNX Runtime** | Cross-platform | Windows ML, Azure, multi-language apps | High | Low–Medium |
| **CoreML/TFLite/QNN** | Edge | On-device mobile/IoT | Low–Medium | High (conversion) |
| **bitnet.cpp** | Local (CPU) | 1.58-bit ternary models | Research | Low |

---

### 7. Engine → Tool Mapping

| Engine (runs the model) | Tools Built On It (you use these) |
|:--|:--|
| **llama.cpp** | Ollama, LM Studio, GPT4All, Jan, koboldcpp |
| **vLLM** | Open WebUI (API backend), custom API servers |
| **TGI** | Hugging Face Inference Endpoints |
| **TensorRT-LLM** | NVIDIA NIM containers, Triton |
| **ONNX Runtime** | Windows ML, Azure ML, HF Optimum, browser apps, DirectML |
| **CoreML Runtime** | iOS/macOS apps (Siri, on-device features) |
| **bitnet.cpp** | BitNet b1.58 research, proof-of-concept |

> **💡 Key insight:** When someone says "Ollama is fast," they really mean "llama.cpp is fast." Ollama is the user-friendly wrapper; llama.cpp is the engine doing the actual computation.

---

### 8. Selection Guide

```
What's your situation?
│
├── Running locally on your machine?
│   ├── Any hardware → llama.cpp (via Ollama)
│   ├── NVIDIA GPU + EXL2 models → ExLlamaV2
│   ├── Mac + ML research → MLX
│   └── 1.58-bit ternary models → bitnet.cpp (research)
│
├── Serving an API to users?
│   ├── General purpose, high throughput → vLLM
│   ├── Structured outputs / agents → SGLang
│   ├── HF ecosystem → TGI
│   └── NVIDIA enterprise, max speed → TensorRT-LLM
│
├── Cross-platform / multi-language app?
│   └── ONNX Runtime (any OS, any hardware, any language)
│       ├── Windows desktop → DirectML backend
│       ├── Azure cloud → Azure ML integration
│       ├── Browser → ONNX Runtime Web (WebAssembly/WebGPU)
│       └── HF models → Optimum + ONNX Runtime
│
└── On-device / mobile?
    ├── Apple → CoreML Runtime
    ├── Android → TFLite Runtime
    └── Qualcomm → QNN Runtime
```


### L6 Tools (AI Tools & Environments)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

### 1. The Tool Landscape

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

### 2. Model Servers (Backend — No UI)

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

### 3. AI Desktop Apps (Runner + Chat UI)

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

### 4. AI Web UIs (Frontend — Needs Backend)

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

### 5. Cloud AI Assistants

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

### 6. Cloud Inference Platforms

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

### 7. AI IDEs & Coding Assistants

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

### 8. CLI Coding Agents

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

### 9. Autonomous Agents & No-Code Builders

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

### 10. Tool Selection Guide

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


### L7 LLM Extensions (LLM Extensions & Capabilities)

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)
>
> **📌 Decision guidance:** For RAG vs fine-tuning decisions, see the Living Stack: [L3-adaptability.md](./L3-adaptability.md)

---

### 1. Why Extensions Matter

A base LLM is powerful but limited:
- ❌ Can't access the internet or your files
- ❌ Can't take actions (send emails, write code, query databases)
- ❌ Doesn't know your private data
- ❌ Forgets everything between sessions
- ❌ Knowledge frozen at training cutoff date

**Extensions** solve all of these. They turn an LLM from a "smart text predictor" into an **autonomous agent** that can perceive, reason, act, and remember.

---

### 2. The Extension Ecosystem

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

### 3. Agents — From Talkers to Doers

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

### 4. Function Calling — The Bridge from Words to Actions

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

### 5. MCP — Model Context Protocol

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

### 6. RAG — Retrieval-Augmented Generation

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

### 7. Memory — Persistence Across Sessions

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

### 8. Protocols & Standards

### A2A — Agent-to-Agent Protocol

Google's open standard for **agents communicating with each other** (complementary to MCP):

| Protocol | Purpose | Scope |
|:--|:--|:--|
| **MCP** | AI ↔ Tools/Data | Connect to external capabilities |
| **A2A** | Agent ↔ Agent | Coordinate between autonomous agents |

A2A is newer and still emerging. MCP is more established and widely adopted.

---

### 9. Glossary

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




# Living Stack Tiers

### T1 Foundation (Foundation — The Base You Build On)

> **Living Stack — Tier 1** | The part that changes **yearly**
>
> For the technology catalog, see [01-model-architectures.md](./01-model-architectures.md) and [02-training-adaptation.md](./02-training-adaptation.md)

---

### 1. What Is a Foundation Model?

A foundation model is a massive neural network **pre-trained on trillions of tokens** of text, code, and other data. It learns the patterns and structure of human language — grammar, facts, reasoning, code — through pure next-token prediction.

The foundation is what you **don't change**. It's the most expensive, most static part of the AI stack. Everything else (alignment, adaptability) builds on top of it.

```
Foundation Model = Trillions of tokens + Billions of parameters + Months of training + $$$
```

**Output:** A "base model" — it can complete text, but it doesn't know how to have a conversation, follow instructions, or be helpful. That comes later (see [L2-alignment.md](./L2-alignment.md)).

---

### 2. Pre-Training — How Foundations Are Built

Pre-training is the process of reading vast amounts of text and learning to predict what comes next. No human labels, no instruction examples — pure pattern learning at scale.

### The Data

| Source | What the Model Learns |
|:--|:--|
| Web crawl (Common Crawl) | General knowledge, language patterns, culture |
| Books | Long-form reasoning, narrative structure |
| Code (GitHub, StackOverflow) | Programming languages, logic, problem-solving |
| Scientific papers (arXiv) | Technical reasoning, domain expertise |
| Wikipedia | Factual knowledge, structured information |
| Conversations (Reddit, forums) | Dialogue patterns, opinions, debate |

**Data quality matters enormously.** Models trained on cleaned, curated data outperform models trained on larger but noisier datasets. This is why labs invest heavily in data pipelines.

### The Scale

| Model | Training Data | Parameters | Estimated Cost | Lab |
|:--|:--|:--|:--|:--|
| GPT-4 | ~13T tokens | ~1.8T (MoE) | ~$100M+ | OpenAI |
| Llama 3.1 405B | 15T tokens | 405B | ~$50M+ | Meta |
| Gemini Ultra | Undisclosed | Undisclosed (MoE) | ~$100M+ | Google |
| DeepSeek-V3 | 14.8T tokens | 671B (MoE, 37B active) | ~$5.5M | DeepSeek |
| Qwen 2.5 72B | 18T tokens | 72B | Undisclosed | Alibaba |

> **💡 DeepSeek's cost efficiency** is remarkable — 10-20x cheaper than Western labs for comparable quality. This challenged the assumption that foundation models require $100M+ budgets.

### The Process

```
Raw Data (petabytes)
    │
    ├── Filter & deduplicate (remove spam, toxic content, duplicates)
    ├── Tokenise (convert text to numbers)
    ├── Train (next-token prediction across thousands of GPUs)
    │   └── Months of continuous training, checkpointing every few hours
    └── Evaluate (benchmarks: MMLU, HumanEval, GSM8K, etc.)
```

### Who Does Pre-Training?

**Only well-funded labs.** The compute, data engineering, and infrastructure requirements are immense:

| Requirement | Scale |
|:--|:--|
| GPUs | 10,000–100,000+ H100/A100 GPUs |
| Time | 2–6 months continuous training |
| Data pipeline | Petabytes of cleaned, deduplicated data |
| Team | 20–100+ researchers and engineers |
| Cost | $5M–$100M+ |

**As a practitioner, you will never pre-train a model.** You choose a pre-trained foundation and build on top of it.

---

### 3. Continued Pre-Training (CPT)

CPT is additional pre-training on **domain-specific data** to make a general model into a specialist. It sits between "full pre-training" (from scratch) and "fine-tuning" (format/behaviour).

### When to Use CPT

| Scenario | CPT? | Why |
|:--|:--|:--|
| General-purpose chatbot | ❌ | Base model already covers general knowledge |
| Legal document analysis | ✅ | Legal language and precedent are underrepresented in web crawls |
| Medical diagnosis support | ✅ | Medical terminology and reasoning need deep domain coverage |
| Financial analysis | ✅ | Financial data, earnings reports, regulatory filings |
| Code for a specific language | ⚠️ | Only if the language is niche (e.g., COBOL, Fortran) |

### The Catastrophic Forgetting Problem

The biggest risk with CPT: the model may "forget" its general knowledge while absorbing domain expertise.

```
Before CPT:  Good at general tasks ✅,  Bad at legal tasks ❌
After CPT:   Bad at general tasks ❌,   Good at legal tasks ✅  ← catastrophic forgetting!
```

**Mitigations:**
- **Replay buffers** — mix general data back into the domain training set (e.g., 70% domain, 30% general)
- **Gradual learning rates** — train slowly to avoid overwriting existing knowledge
- **Knowledge distillation** — use the original model as a "teacher" to retain general capabilities
- **Evaluation checkpoints** — test both domain and general benchmarks throughout training

### CPT vs Fine-Tuning vs RAG

| Technique | What It Changes | Depth | Cost | Best For |
|:--|:--|:--|:--|:--|
| **CPT** | Model's core knowledge | Deep | High ($10K–$1M) | Domain language and reasoning |
| **Fine-tuning (SFT/LoRA)** | Model's behaviour and format | Surface | Medium ($10–$10K) | Instruction following, style |
| **RAG** | Nothing (retrieval at runtime) | External | Low (infrastructure) | Current data, citations |

> **💡 Rule of thumb:** If the model doesn't understand the domain's *language*, CPT. If it understands the language but doesn't *behave* correctly, fine-tune. If it just needs access to *data*, RAG.

---

### 4. The 2026 Foundation Landscape

### Open-Source Families

| Family | Lab | Latest Models | Strengths |
|:--|:--|:--|:--|
| **Llama** | Meta | 3.1 8B/70B/405B | Best open ecosystem, massive community |
| **Qwen** | Alibaba | 2.5 7B/32B/72B | Strong multilingual, excellent value |
| **Mistral** | Mistral AI | Large 2, Mixtral | European, strong MoE architecture |
| **DeepSeek** | DeepSeek | V3, R1 | Cost-efficient MoE, breakthrough reasoning |
| **Gemma** | Google | 2 2B/9B/27B | Compact, research-friendly |
| **Phi** | Microsoft | 3/4 Mini/Medium | Small but surprisingly capable |
| **Command** | Cohere | R+, Command A | Enterprise RAG-optimised |

### Proprietary Families

| Family | Lab | Access | Strengths |
|:--|:--|:--|:--|
| **GPT** | OpenAI | API, ChatGPT | Most popular, broadest capabilities |
| **Claude** | Anthropic | API, Claude.ai | Best reasoning, extended thinking, safety |
| **Gemini** | Google | API, Gemini app | Google integration, largest context windows |
| **Grok** | xAI | API, X platform | Real-time data, less content filtering |

### Open vs Proprietary — The Tradeoff

| Factor | Open-Source | Proprietary |
|:--|:--|:--|
| **Control** | ✅ Full — run anywhere, modify anything | ❌ API-only, vendor lock-in |
| **Privacy** | ✅ Data never leaves your infrastructure | ⚠️ Data sent to vendor's servers |
| **Cost** | ✅ Free weights, pay for compute only | ❌ Per-token pricing, costs scale |
| **Capability ceiling** | ⚠️ Catching up fast, but gap remains | ✅ Highest quality (GPT-4o, Claude Opus) |
| **Support** | ⚠️ Community-driven | ✅ Enterprise SLAs, guaranteed uptime |
| **Fine-tuning** | ✅ Full access — SFT, LoRA, CPT | ⚠️ Limited (some vendors offer hosted fine-tuning) |
| **Speed of innovation** | ✅ Rapid community iteration | ⚠️ Vendor release cycles |

> **💡 The 2026 reality:** The gap between open and proprietary is narrowing rapidly. DeepSeek-R1 matched GPT-4 reasoning at a fraction of the cost. For many production use cases, open-source models are now "good enough."

---

### 5. Model Selection Guide

### Decision Tree

```
What's your use case?
│
├── General chat / assistant?
│   ├── Need the absolute best? → GPT-4o, Claude Opus, or Gemini Ultra
│   ├── Need privacy / local? → Llama 3.1 70B or Qwen 2.5 72B
│   └── Need it small and fast? → Llama 3.1 8B, Phi-4 Mini, or Gemma 2 9B
│
├── Code generation?
│   ├── Best quality? → Claude Opus or GPT-4o
│   ├── Open-source? → DeepSeek-Coder, Qwen2.5-Coder
│   └── Local / edge? → Phi-4 Mini, CodeGemma
│
├── Reasoning / math / science?
│   ├── Best quality? → o3, Claude Extended Thinking
│   ├── Open-source? → DeepSeek-R1, QwQ
│   └── Cost-efficient? → DeepSeek-R1-Distill-Llama-70B
│
├── Ultra-fast inference (1000+ tok/s)?
│   └── Mercury (Inception Labs) — diffusion LLM, parallel generation
│       ├── Chat → Mercury
│       ├── Code → Mercury Coder / Mercury Edit 2
│       └── Reasoning → Mercury 2
│
├── Ultra-efficient / no-GPU inference?
│   └── BitNet b1.58 models — ternary weights {-1, 0, 1}, CPU-only
│       └── Inference: bitnet.cpp (research stage)
│
├── Domain-specific (legal, medical, finance)?
│   ├── Can invest in CPT? → Llama 3.1 70B + domain CPT
│   ├── Need quick solution? → RAG on top of any strong base
│   └── Enterprise with compliance? → Azure OpenAI or AWS Bedrock
│
├── Multilingual?
│   ├── Best overall? → GPT-4o or Gemini
│   └── Open-source? → Qwen 2.5 (strongest multilingual open model)
│
└── Edge / mobile / embedded?
    ├── iOS / macOS? → Gemma 2 2B via CoreML, or Phi-4 Mini via MLX
    ├── Android? → Gemma 2 2B via TFLite
    └── IoT / ultra-constrained? → Phi-3 Mini quantised
```

### Size vs Quality Tradeoffs

| Size | VRAM Needed (Q4) | Quality | Response Speed | Best Use |
|:--|:--|:--|:--|:--|
| **1–3B** | 2–4 GB | Basic | Instant | Edge, mobile, simple tasks |
| **7–9B** | 4–6 GB | Good | Very fast | Local dev, prototyping, drafting |
| **13–14B** | 8–10 GB | Strong | Fast | Production (quality-sensitive) |
| **32–34B** | 18–22 GB | Very strong | Moderate | Serious production, complex tasks |
| **70B** | 35–45 GB | Excellent | Slower | Best open-source quality |
| **405B (MoE)** | 200+ GB | Near-frontier | Slow | Research, maximum capability |

> **💡 The sweet spot in 2026:** For most local use, **70B Q4_K_M** on a Mac Studio with 192GB unified memory gives you near-frontier quality at zero API cost. For quick iteration, **8B** models respond in milliseconds.

---

### 6. The Foundation Principle

The foundation is the **most expensive and slowest-changing part** of the stack. Once you choose a base model, everything else adapts around it:

```
Foundation (choose once, change rarely)
    ↓
Alignment (customize monthly — see L2-alignment.md)
    ↓
Adaptability (update daily — see L3-adaptability.md)
```

**The practical implication:** Don't agonize over foundation choice. Pick a strong base model that fits your hardware budget, then invest your energy in alignment and adaptability — that's where the real customisation happens.


### T2 Alignment (Alignment — Making the Model Yours)

> **Living Stack — Tier 2** | The part that changes **weekly/monthly**
>
> For the technology reference, see [02-training-adaptation.md](./02-training-adaptation.md)

---

### 1. What Is Alignment?

A pre-trained base model can predict the next token, but it can't:
- ❌ Follow instructions ("summarise this in 3 bullet points")
- ❌ Refuse harmful requests ("tell me how to…")
- ❌ Match a particular style or domain
- ❌ Reason step-by-step about complex problems

**Alignment** transforms a raw base model into a useful, safe, specialised assistant. It's the bridge between "raw language prediction" and "helpful AI tool."

```
Base Model (predicts text)  →  Alignment  →  Instruct Model (follows instructions)
```

---

### 2. The Alignment Pipeline

Most production models follow this sequence:

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────────┐   ┌──────────┐
│   Base    │──▶│   CPT    │──▶│   SFT    │──▶│   Preference     │──▶│  Deploy  │
│  Model    │   │(optional)│   │          │   │ (DPO/RLHF/GRPO)  │   │          │
└──────────┘   └──────────┘   └──────────┘   └──────────────────┘   └──────────┘
  (from L1)     domain data    format/style    human preferences     (to L3)
```

Each stage builds on the previous:
1. **CPT** (optional) — teaches domain knowledge (see [L1-foundation.md](./L1-foundation.md))
2. **SFT** — teaches format, style, instruction-following
3. **Preference optimisation** — teaches quality, safety, human preferences
4. **Deploy** — quantise, serve, and add runtime extensions (see [L3-adaptability.md](./L3-adaptability.md))

---

### 3. SFT — Supervised Fine-Tuning

SFT is the first and most impactful alignment step. It teaches the model **how to behave** — how to follow instructions, format responses, and adopt a conversational style.

### How It Works

You provide thousands of (instruction, response) pairs. The model learns to produce outputs that match these examples.

```
Training pair:
  Instruction: "Explain quantum computing to a 10-year-old"
  Response:    "Imagine a regular computer is like a light switch — it can
                be ON or OFF. A quantum computer is like a dimmer switch..."
```

### Dataset Formats

| Format | Structure | Used By |
|:--|:--|:--|
| **Alpaca** | `{"instruction": "...", "input": "...", "output": "..."}` | Stanford Alpaca, many OSS |
| **ShareGPT** | Multi-turn conversation: `[{"from": "human", "value": "..."}, {"from": "gpt", "value": "..."}]` | Vicuna, community models |
| **Chat Template** | Role-based: `system`, `user`, `assistant` messages | OpenAI, Llama, most modern |
| **Tool-augmented** | Conversations with function calls and tool results | For tool-use training |

### Data Quality > Quantity

A critical insight that has emerged in 2026:

| Approach | Scale | Quality | Result |
|:--|:--|:--|:--|
| LIMA (Meta, 2023) | 1,000 examples | Hand-curated by experts | Competitive with 52K-example Alpaca |
| Alpaca | 52,000 examples | GPT-3.5 generated | Good but noisy |
| Industry practice | 10K–100K | Human-reviewed, diverse | Best results |

> **💡 1,000 excellent examples often beat 50,000 mediocre ones.** Invest in data quality — it's the highest-ROI activity in fine-tuning.

### Tooling for SFT

| Tool | Best For | Key Feature |
|:--|:--|:--|
| **Unsloth** | Consumer GPU fine-tuning | 2x faster, 60% less memory |
| **Axolotl** | Flexible research fine-tuning | YAML config, many dataset formats |
| **LLaMA-Factory** | No-code fine-tuning | Web UI, 100+ model support |
| **HF Trainer** | Custom training loops | Maximum flexibility, Hugging Face ecosystem |
| **TRL (Transformer RL)** | Preference + SFT combined | Built for the full alignment pipeline |

---

### 4. Reinforcement Learning & Preference Optimisation

After SFT, preference optimisation teaches the model **which responses humans prefer** — choosing between two correct answers based on helpfulness, safety, and style.

### RLHF — Reinforcement Learning from Human Feedback

The original alignment method, used by OpenAI for GPT-3.5/4 and Anthropic for Claude.

**Three-stage process:**

```
Stage 1: Collect human preferences
   Model generates two responses to the same prompt
   Human annotator ranks: Response A > Response B

Stage 2: Train a reward model
   A separate model learns to predict human preferences
   Input: (prompt, response) → Output: score (0–1)

Stage 3: Optimise with PPO (Proximal Policy Optimisation)
   The LLM generates responses
   Reward model scores them
   PPO updates the LLM to produce higher-scoring responses
   KL divergence penalty prevents the model from drifting too far from the SFT baseline
```

**Why RLHF is hard:**
- Requires training a **separate reward model** (another full-sized model)
- PPO is **unstable** — sensitive to hyperparameters, prone to reward hacking
- **Expensive** — needs significant compute and human annotation
- **Complex engineering** — multiple models training simultaneously

| Pros | Cons |
|:--|:--|
| Proven at scale (GPT-4, Claude) | High complexity and cost |
| Most flexible objective | Reward hacking risk |
| Well-studied theory | Requires separate reward model |

---

### DPO — Direct Preference Optimisation

DPO dramatically simplified preference optimisation by **eliminating the reward model entirely**.

**How it works:**

```
Input: (prompt, chosen_response, rejected_response) triplets
Process: Directly optimise the LLM to increase probability of chosen
         and decrease probability of rejected responses
Output: Aligned model (no separate reward model needed)
```

**The mathematical insight:** DPO proves that the optimal policy under RLHF's objective can be obtained by a simple classification loss on preference pairs, without ever training a reward model.

**Practical advantages:**
- **Much simpler** — single training loop instead of three
- **More stable** — no PPO hyperparameter sensitivity
- **Cheaper** — no reward model to train or serve
- **Same quality** — matches or beats RLHF in most benchmarks

| Pros | Cons |
|:--|:--|
| Simple — one training loop | Needs paired (chosen, rejected) data |
| Stable — no PPO instability | Can overfit to preference data |
| Cheap — no reward model | Less flexible than RLHF for complex objectives |

> **💡 DPO is now the default for open-source alignment.** Most community models use DPO because it's simpler, cheaper, and produces comparable results to RLHF.

---

### GRPO — Group Relative Policy Optimisation

DeepSeek's innovation, used to train DeepSeek-R1 — the model that matched GPT-4 reasoning capabilities.

**How it works:**

```
1. For each prompt, generate a GROUP of N responses (e.g., 64)
2. Score each response with verifiable rewards:
   - Math: is the answer correct? (0 or 1)
   - Code: does it pass the test cases? (0 or 1)
   - Format: does it follow the required structure?
3. Rank responses within the group (relative scoring)
4. Optimise: increase probability of high-ranked responses,
   decrease probability of low-ranked responses
```

**Key insight — verifiable rewards:** GRPO uses objective scoring (correct/incorrect) instead of human preference, which is possible for math and code because answers can be verified programmatically.

**Why it matters:**
- **No human annotation** — verifiable rewards are automated
- **No reward model** — scoring is programmatic
- **Scales beautifully** — generate more samples, get better alignment
- **Breakthrough for reasoning** — DeepSeek-R1-Zero emerged chain-of-thought reasoning through GRPO alone, without any SFT

---

### KTO — Kahneman-Tversky Optimisation

A newer method that only needs **individual labels** (good or bad) — no paired comparisons needed.

```
DPO needs:   (prompt, chosen_response, rejected_response) — paired data
KTO needs:   (prompt, response, label: good/bad) — unpaired data
```

**Why it matters:** Paired preference data is expensive to collect. KTO works with simpler data — just "was this response good or bad?" — making it more practical for many scenarios.

---

### Constitutional AI (CAI)

Anthropic's approach to alignment. Instead of human-labelled preferences, the model **critiques and revises its own responses** based on a set of principles (a "constitution").

```
1. Model generates initial response
2. Model evaluates: "Does this response violate any of these principles?"
   - Be helpful, harmless, and honest
   - Don't assist with illegal activities
   - Acknowledge uncertainty
3. Model revises its response to align with principles
4. The revised responses become training data
```

**Key innovation:** Scales alignment without proportionally scaling human annotation.

---

### Preference Method Comparison

| Method | Needs Reward Model? | Data Requirement | Complexity | Used By |
|:--|:--|:--|:--|:--|
| **RLHF (PPO)** | ✅ Yes | Human preference pairs | High | OpenAI (GPT-4), Anthropic (Claude) |
| **DPO** | ❌ No | Chosen/rejected pairs | Low | Most open-source models |
| **GRPO** | ❌ No | Verifiable rewards | Medium | DeepSeek (R1) |
| **KTO** | ❌ No | Good/bad labels (unpaired) | Low | Research, emerging |
| **Constitutional AI** | ❌ No | Principles + self-critique | Medium | Anthropic (Claude) |

### When to Use Which

```
Do you have paired preference data?
├── Yes, high quality → DPO (simplest, proven)
├── Yes, but noisy → RLHF (reward model filters noise)
│
├── No paired data, but have good/bad labels?
│   └── KTO (works with unpaired data)
│
├── Task has verifiable answers (math, code)?
│   └── GRPO (automated, scalable)
│
└── Want to scale alignment without human annotation?
    └── Constitutional AI (self-supervised)
```

---

### 5. LoRA & QLoRA — Democratised Fine-Tuning

Full fine-tuning updates all model parameters — requiring massive GPU resources. LoRA makes alignment accessible to anyone with a consumer GPU.

### How LoRA Works

Instead of updating the model's full weight matrices, LoRA injects **small trainable adapter matrices** that capture the desired changes:

```
Original weight matrix W (frozen):     [4096 × 4096] = 16M parameters
LoRA adapter A × B (trainable):        [4096 × 16] × [16 × 4096] = 131K parameters

That's 0.8% of the original parameters — 99.2% reduction in trainable params.
```

**The mathematical insight:** Fine-tuning typically produces low-rank weight changes. LoRA exploits this by decomposing the update into two small matrices (rank `r`, typically 8–64).

### LoRA Hyperparameters

| Parameter | What It Controls | Typical Value |
|:--|:--|:--|
| **Rank (r)** | Adapter capacity — higher = more expressive | 8–64 (start with 16) |
| **Alpha (α)** | Scaling factor for adapter contribution | Usually 2× rank |
| **Target modules** | Which layers get adapters | `q_proj, v_proj` (attention layers) |
| **Dropout** | Regularisation to prevent overfitting | 0.05–0.1 |

### QLoRA — Going Further

QLoRA combines two techniques to fine-tune massive models on consumer hardware:

```
1. Quantise the base model to 4-bit (NF4 — a quantisation format optimised for
   normally-distributed weights)
2. Apply LoRA adapters on top (trained in BFloat16)
3. Use paged optimisers (offload optimizer states to CPU when GPU is full)

Result: Fine-tune a 70B model on a single RTX 4090 (24 GB VRAM)
```

### Practical LoRA Workflow

```bash
# Using Unsloth (2x faster, 60% less memory)
pip install unsloth

# Train a LoRA adapter
python train.py \
  --model meta-llama/Llama-3.1-8B \
  --dataset your_data.jsonl \
  --lora_rank 16 \
  --num_epochs 3 \
  --output_dir ./my-adapter

# Result: ~50 MB adapter file (vs 16 GB base model)
```

### Adapter Management

One of LoRA's killer features — **swap adapters** on the same base model:

```
Base: Llama 3.1 70B (140 GB)
  ├── legal-adapter.safetensors (50 MB) → Legal document analysis
  ├── medical-adapter.safetensors (50 MB) → Medical Q&A
  ├── code-adapter.safetensors (50 MB) → Code generation
  └── brand-voice-adapter.safetensors (50 MB) → Your company's writing style

Swap at runtime — no need to load different 140 GB models!
```

### Merging Adapters

For deployment, merge the adapter back into the base model:

```
Base Model + LoRA Adapter → Merged Model (full-size, no adapter overhead at inference)
```

Merging removes the runtime overhead of applying adapters but loses the ability to swap.

> **💡 LoRA is to AI what Docker was to deployment — it democratised something previously accessible only to large organisations.**

---

### 6. Distillation — Compressing Intelligence

Distillation transfers knowledge from a **large "teacher" model** to a **smaller "student" model**, preserving 80–90% of the quality at a fraction of the cost.

### How It Works

```
Teacher (405B, expensive, slow)
    │
    │  Generate responses to thousands of prompts
    │  Student learns to mimic teacher's outputs
    │  (including soft probabilities, not just hard labels)
    ▼
Student (8B, cheap, fast)
    → 80-90% of teacher quality
    → 50x cheaper to run
    → 10x faster inference
```

### Soft Labels vs Hard Labels

| Type | What the Student Learns | Quality |
|:--|:--|:--|
| **Hard labels** | Just the final answer: "Paris" | Lower — loses nuance |
| **Soft labels** | Full probability distribution: "Paris 0.85, Lyon 0.05, Marseille 0.03..." | Higher — captures teacher's uncertainty and reasoning |

The teacher's probability distribution contains rich information — which alternatives the teacher considered, how confident it was — that hard labels lose.

### Real-World Distillation: DeepSeek-R1

DeepSeek's distillation chain is the best 2026 example:

```
DeepSeek-R1-Zero (GRPO only, no SFT)
    ↓ SFT + preference
DeepSeek-R1 (full model, 671B MoE)
    ↓ distillation
DeepSeek-R1-Distill-Llama-70B  → near R1 quality, runs locally
DeepSeek-R1-Distill-Qwen-32B  → good quality, modest hardware
DeepSeek-R1-Distill-Llama-8B  → decent quality, runs on laptops
```

### When Distillation Beats Fine-Tuning

| Scenario | Distillation | Fine-tuning |
|:--|:--|:--|
| Have access to a powerful teacher model | ✅ Best choice | ⚠️ Limited by your training data |
| Need a small, fast production model | ✅ Shrink the teacher | ⚠️ Small model may not have enough capacity |
| Want reasoning capabilities in a small model | ✅ Transfer reasoning patterns | ❌ Hard to teach reasoning from data alone |
| Have domain-specific training data | ⚠️ Need a teacher with domain knowledge | ✅ Direct from your data |

---

### 7. Inference-Time Scaling — Smarter, Not Bigger

The 2026 frontier isn't just bigger models — it's giving models **more time to think** during inference.

### Chain-of-Thought (CoT)

Simply asking the model to "think step by step" dramatically improves reasoning:

```
Without CoT: "What is 23 × 17?" → "391" (often wrong)
With CoT:    "What is 23 × 17? Think step by step."
             → "23 × 17 = 23 × 10 + 23 × 7 = 230 + 161 = 391" ✅
```

### Thinking Tokens

Modern reasoning models generate **internal reasoning** that the user doesn't see:

| Model | Approach | How It Works |
|:--|:--|:--|
| **o1 / o3** (OpenAI) | Internal CoT | Hidden thinking tokens before answering |
| **Claude Extended Thinking** (Anthropic) | Visible CoT | Thinking shown in a collapsible block |
| **DeepSeek-R1** | Long CoT | Extended reasoning chains (can be very long) |

### Test-Time Compute Scaling

A paradigm shift: instead of making models bigger (training-time scaling), spend more compute at inference:

```
Training-Time Scaling:   Bigger model = better answers (expensive to train)
Test-Time Scaling:       More thinking = better answers (expensive per query, but flexible)
```

**The tradeoff:** A smaller model with more inference compute can match a larger model:

```
Llama 3.1 8B + extended thinking ≈ Llama 3.1 70B + standard inference
(much cheaper to deploy)          (much more expensive to deploy)
```

---

### 8. The Alignment Decision Framework

### "When Should I Align?"

```
Is the base model already good enough with just prompting?
├── Yes → Don't align. Prompt engineering is free and immediate.
│
├── No — it doesn't know my domain language?
│   └── CPT (domain pre-training) → then SFT → then preference
│
├── No — it knows the domain but doesn't follow my format/style?
│   └── SFT (10K–100K examples of desired behavior)
│
├── No — it follows format but responses aren't good enough quality?
│   └── Preference optimisation (DPO is the default)
│
└── No — I need the model on a consumer GPU?
    └── LoRA/QLoRA (fine-tune without massive hardware)
```

### Hardware Requirements

| Technique | Minimum Hardware | Typical Setup |
|:--|:--|:--|
| **Prompt engineering** | Any device with API access | Free — no training |
| **LoRA (7–8B model)** | 1× RTX 4090 (24 GB) | Single GPU, few hours |
| **QLoRA (70B model)** | 1× RTX 4090 (24 GB) | Single GPU, 1–2 days |
| **Full SFT (7–8B)** | 4× A100 (320 GB total) | Multi-GPU, hours |
| **Full SFT (70B)** | 16+ A100 (1.3 TB total) | Multi-node, days |
| **RLHF** | 32+ A100 (2.6 TB+) | Multi-node, weeks |
| **CPT** | 64+ A100 | Cluster, weeks–months |
| **Pre-training** | 10,000+ H100 | Supercluster, months |

### Cost/Benefit Summary

| Technique | Cost | Time | Impact | Accessibility |
|:--|:--|:--|:--|:--|
| **Prompt engineering** | Free | Minutes | 🟢 Moderate | ✅ Everyone |
| **RAG** | Infrastructure only | Hours | 🟢 High for knowledge | ✅ Everyone |
| **LoRA/QLoRA** | $10–$100 (cloud GPU) | Hours | 🟢 High for behaviour | ✅ Consumer GPU |
| **SFT** | $100–$10K | Hours–days | 🟡 High | ⚠️ Multi-GPU |
| **DPO** | $100–$10K | Hours–days | 🟡 High for quality | ⚠️ Multi-GPU |
| **Distillation** | $1K–$50K | Days | 🟡 Very high | ⚠️ Needs teacher access |
| **CPT** | $10K–$1M | Weeks | 🟡 Domain knowledge | ❌ Cluster |
| **Pre-training** | $5M–$100M+ | Months | 🔴 Maximum | ❌ Labs only |


### T3 Adaptability (Adaptability — The Dynamic Layer)

> **Living Stack — Tier 3** | The part that changes **daily**
>
> For the technology reference, see [07-llm-extensions.md](./07-llm-extensions.md)

---

### 1. What Is Adaptability?

Adaptability is everything you add **at runtime** — without retraining or modifying the model weights. It's the fastest-changing, most accessible layer of the AI stack.

```
Foundation (static, yearly)         → "The brain"
Alignment (semi-static, monthly)    → "Personality and skills"
Adaptability (dynamic, daily)       → "Current knowledge, tools, and memory"
```

This is where **most practitioners spend their time**. You don't pre-train models. You rarely fine-tune. But you connect them to tools, inject knowledge, and give them memory — every day.

---

### 2. RAG — Retrieval-Augmented Generation

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

### 3. Agents — From Talkers to Doers

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

### 4. Tool Use & Protocols

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

### 5. Memory — Persistence Across Sessions

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

### 6. RAG vs Fine-Tuning — The Definitive Guide

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

### 7. The Adaptability Advantage

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


