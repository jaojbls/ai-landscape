with open("/Users/jao/projects/antigravity/test-ai/ai-landscape/docs/index.md", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "Deep-dive:" not in line:
        new_lines.append(line)

with open("/Users/jao/projects/antigravity/test-ai/ai-landscape/docs/index.md", "w") as f:
    f.writelines(new_lines)
print("cleaned")
