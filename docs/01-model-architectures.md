# Model Architectures & Inference Parameters


---

## 1. How AI Models Are Classified

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

## 2. Architecture Deep Dives

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

## 3. The 2026 Trend: Model Routing

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

## 4. Inference Parameters — Tweaking Model Behaviour

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
