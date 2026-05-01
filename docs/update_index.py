import re

with open("/Users/jao/projects/antigravity/test-ai/ai-landscape/docs/index.md", "r") as f:
    content = f.read()

# 1) Remove deep dive lines
content = re.sub(r"│\s+→ Deep-dive:.*?\.md\s+│\n", "", content)

# 2) Reorder Living Stack Tiers
# The Living Stack block starts around line 176.
# We will extract T1, T2, T3 blocks and reconstruct it.
# We look for the patterns of Tier blocks.
tier1_pattern = re.search(r"(│  ┌───────────────────────────────────────────────────────────┐  │\n│  │  TIER 1.*?│  └───────────────────────────────────────────────────────────┘  │\n)", content, re.DOTALL)
tier2_pattern = re.search(r"(│  ┌───────────────────────────────────────────────────────────┐  │\n│  │  TIER 2.*?│  └───────────────────────────────────────────────────────────┘  │\n)", content, re.DOTALL)
tier3_pattern = re.search(r"(│  ┌───────────────────────────────────────────────────────────┐  │\n│  │  TIER 3.*?│  └───────────────────────────────────────────────────────────┘  │\n)", content, re.DOTALL)

if tier1_pattern and tier2_pattern and tier3_pattern:
    t1 = tier1_pattern.group(1)
    t2 = tier2_pattern.group(1)
    t3 = tier3_pattern.group(1)

    # We need to replace the entire old T3 -> T2 -> T1 section with T1 -> T2 -> T3
    # The old section looks like:
    # t3
    # │                              ▲                                  │
    # t2
    # │                              ▲                                  │
    # t1
    
    old_section = t3 + "│                              ▲                                  │\n" + t2 + "│                              ▲                                  │\n" + t1
    new_section = t1 + "│                              ▼                                  │\n" + t2 + "│                              ▼                                  │\n" + t3
    
    content = content.replace(old_section, new_section)

# 3) Update table
content = content.replace("| Foundation | L1 (Architectures)", "| T1 Foundation | L1 (Architectures)")
content = content.replace("| Alignment | L2 (SFT, DPO", "| T2 Alignment | L2 (SFT, DPO")
content = content.replace("| Adaptability | L7 (RAG, Agents", "| T3 Adaptability | L7 (RAG, Agents")

with open("/Users/jao/projects/antigravity/test-ai/ai-landscape/docs/index.md", "w") as f:
    f.write(content)
print("done")
