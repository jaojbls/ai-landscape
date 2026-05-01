# Foundation — The Base You Build On

> **Living Stack — Tier 1** | The part that changes **yearly**
>
> For the technology catalog, see [01-model-architectures.md](./01-model-architectures.md) and [02-training-adaptation.md](./02-training-adaptation.md)

---

## 1. What Is a Foundation Model?

A foundation model is a massive neural network **pre-trained on trillions of tokens** of text, code, and other data. It learns the patterns and structure of human language — grammar, facts, reasoning, code — through pure next-token prediction.

The foundation is what you **don't change**. It's the most expensive, most static part of the AI stack. Everything else (alignment, adaptability) builds on top of it.

```
Foundation Model = Trillions of tokens + Billions of parameters + Months of training + $$$
```

**Output:** A "base model" — it can complete text, but it doesn't know how to have a conversation, follow instructions, or be helpful. That comes later (see [L2-alignment.md](./L2-alignment.md)).

---

## 2. Pre-Training — How Foundations Are Built

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

## 3. Continued Pre-Training (CPT)

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

## 4. The 2026 Foundation Landscape

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

## 5. Model Selection Guide

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

## 6. The Foundation Principle

The foundation is the **most expensive and slowest-changing part** of the stack. Once you choose a base model, everything else adapts around it:

```
Foundation (choose once, change rarely)
    ↓
Alignment (customize monthly — see L2-alignment.md)
    ↓
Adaptability (update daily — see L3-adaptability.md)
```

**The practical implication:** Don't agonize over foundation choice. Pick a strong base model that fits your hardware budget, then invest your energy in alignment and adaptability — that's where the real customisation happens.
