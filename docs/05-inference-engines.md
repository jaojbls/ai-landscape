# Inference Engines


---

## 1. What Is an Inference Engine?

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

## 2. Local Inference Engines

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

## 3. Server / Cloud Engines

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

## 4. Cross-Platform Engines

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

## 5. Edge / Mobile Runtimes

These execute small, optimised models on devices with limited compute:

| Runtime | Vendor | Target | Executes |
|:--|:--|:--|:--|
| **CoreML Runtime** | Apple | iPhone, iPad, Mac | CoreML models using Neural Engine + GPU |
| **TFLite Runtime** | Google | Android, embedded | TFLite models on CPU, GPU, NPU |
| **QNN Runtime** | Qualcomm | Snapdragon devices | QNN models on Hexagon DSP |

**Common pattern:** Voice assistants, on-device translation, photo enhancement, real-time camera effects.

---

## 6. Engine Comparison

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

## 7. Engine → Tool Mapping

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

## 8. Selection Guide

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
