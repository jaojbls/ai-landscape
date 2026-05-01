# Alignment — Making the Model Yours

> **Living Stack — Tier 2** | The part that changes **weekly/monthly**
>
> For the technology reference, see [02-training-adaptation.md](./02-training-adaptation.md)

---

## 1. What Is Alignment?

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

## 2. The Alignment Pipeline

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

## 3. SFT — Supervised Fine-Tuning

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

## 4. Reinforcement Learning & Preference Optimisation

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

## 5. LoRA & QLoRA — Democratised Fine-Tuning

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

## 6. Distillation — Compressing Intelligence

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

## 7. Inference-Time Scaling — Smarter, Not Bigger

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

## 8. The Alignment Decision Framework

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
