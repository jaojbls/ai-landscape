# L4 Model Formats

> **Deep-dive document** — For the high-level overview, see [00-overview.md](./00-overview.md)

---

## 1. What Is a Model Format?

A trained AI model is a massive collection of numbers (weights). A **model format** defines how those weights — and optionally the architecture, tokeniser, and metadata — are serialised to disk.

The format you choose affects:
- **Where** you can run the model (which hardware/frameworks)
- **How fast** it loads and runs
- **How safe** it is (can it execute arbitrary code?)
- **How portable** it is (can you move between environments?)

---

## 2. Three Categories of Formats

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

## 3. When to Use Each Format

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

## 4. The Conversion Pipeline

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

## 5. Quantisation

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

## 6. Hardware Compatibility Matrix

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

## 7. Production Deployment

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
