# Training & Adaptation

>
> **📌 Decision guidance:** For when/why to choose between techniques, see the Living Stack: [L2-alignment.md](./L2-alignment.md)

---

## 1. Why This Layer Matters

When you see "Llama 3.1 70B Instruct" on Hugging Face, that name encodes a journey:

- **Llama 3.1** → Base model (pre-trained on trillions of tokens)
- **70B** → 70 billion parameters
- **Instruct** → Fine-tuned to follow instructions (SFT + RLHF)

Understanding how models get from "raw weights" to "useful assistant" explains why there are 50+ variants of the same base model and what "fine-tuned for chat" actually means.

---

## 2. The Training Pipeline

```
Pre-training  →  Continued Pre-training  →  SFT  →  Alignment (DPO/RLHF)  →  Quantise  →  Deploy
($$$ labs)        (optional, domain)         (format)   (preferences)           (compress)    (serve)
```

---

## 3. Pre-Training (From Scratch)

The model reads trillions of tokens (web, books, code, papers) and learns to predict the next token. No human labels — pure pattern learning.

| Model | Training Data | Estimated Cost | Who |
|:--|:--|:--|:--|
| GPT-4 | ~13T tokens | ~$100M+ | OpenAI |
| Llama 3.1 405B | 15T tokens | ~$50M+ | Meta |

**Output:** A "base model" — can complete text but doesn't know how to have a conversation. Only labs do this.

---

## 4. Continued Pre-Training (CPT)

Additional training on domain-specific data to make a general model into a specialist (legal, medical, finance).

**Danger — Catastrophic Forgetting:** The model may "forget" general knowledge. Mitigated via replay buffers, knowledge distillation, and gradual learning rates.

---

## 5. Supervised Fine-Tuning (SFT)

SFT teaches the model **how to behave** — following instructions, conversation format, tone, and style.

- Humans write thousands of example conversations
- The model learns to match this format
- Output: An "Instruct" or "Chat" model (the version you actually use)
- Scale: 10K–100K high-quality examples. Quality > quantity.

---

## 6. Preference Optimisation

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

## 7. LoRA & QLoRA — Accessible Fine-Tuning

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

## 8. Distillation

Transfers knowledge from a **large "teacher" model** to a **smaller "student" model**.

The student gets 80–90% of the teacher's quality at 1/50th the cost. This is how most small open-source models get their quality (e.g., DeepSeek-R1-Distill, Llama 3.1 8B benefits from 405B's training data).

---

## 9. Inference-Time Scaling (2026 Frontier)

Instead of making models bigger, give them **more time to think** at inference.

- **Chain-of-Thought:** Model "thinks out loud" before answering (dramatically improves reasoning)
- **Thinking Tokens:** Internal reasoning the user doesn't see (o1, Claude Extended Thinking, DeepSeek-R1)
- **Test-Time Compute:** Spending more compute at inference can substitute for a bigger model

The 2026 frontier isn't just bigger models — it's smarter inference.

---

## 10. What You Can Do as a Practitioner

| Technique | Accessibility | When to Use |
|:--|:--|:--|
| **Prompt engineering** | ✅ Free, immediate | Always — the first tool to reach for |
| **RAG** | ✅ Your data, no model changes | When you need private/current knowledge |
| **LoRA/QLoRA fine-tuning** | ✅ Consumer GPU | Teaching style, format, or domain expertise |
| **Distillation** | ⚠️ Needs teacher model access | Building a production-grade small model |
| **CPT** | ⚠️ Significant resources | Deep domain specialisation |
| **Pre-training** | ❌ Labs only | You won't do this |
