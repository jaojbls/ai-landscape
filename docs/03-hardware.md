# L3 Hardware

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

## 1. Why Hardware Matters

AI workloads are fundamentally different from traditional computing. They're dominated by **matrix multiplication** — billions of multiply-and-accumulate operations — which is why specialised processors exist.

The hardware you choose determines:
- **What models you can run** (a 70B model needs ~40 GB of memory)
- **How fast they run** (tokens per second)
- **What it costs** (cloud GPU vs local inference)

---

## 2. Processor Types

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

## 3. Hardware Decision Flowchart

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
