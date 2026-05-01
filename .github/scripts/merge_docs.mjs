import fs from 'fs';
import path from 'path';

const docsDir = 'docs'; 
const indexFile = path.join(docsDir, 'index.md');

const layers = [
  '01-model-architectures.md',
  '02-training-adaptation.md',
  '03-hardware.md',
  '04-model-formats.md',
  '05-inference-engines.md',
  '06-tools.md',
  '07-llm-extensions.md'
];

const tiers = [
  'L1-foundation.md',
  'L2-alignment.md',
  'L3-adaptability.md'
];

let indexContent = fs.readFileSync(indexFile, 'utf-8');

// Helper function to convert filename (e.g. "01-model-architectures.md") to a MkDocs anchor
function getAnchor(filename) {
  // MkDocs anchor format: lowercase, replace spaces/hyphens appropriately
  // Actually, MkDocs generates anchors from the *headers*, not the filenames.
  // E.g., `### L1 Model Architectures` -> `#l1-model-architectures`
  // For simplicity, we can do a mapping, but let's just use regex to clean the filename:
  // "01-model-architectures.md" -> l1-model-architectures
  // Let's create a hardcoded map for safety since we know the exact titles we injected!
  const anchorMap = {
    '01-model-architectures.md': '#l1-model-architectures',
    '02-training-adaptation.md': '#l2-training-adaptation',
    '03-hardware.md': '#l3-hardware',
    '04-model-formats.md': '#l4-model-formats',
    '05-inference-engines.md': '#l5-inference-engines',
    '06-tools.md': '#l6-tools',
    '07-llm-extensions.md': '#l7-llm-extensions',
    'L1-foundation.md': '#t1-foundation',
    'L2-alignment.md': '#t2-alignment',
    'L3-adaptability.md': '#t3-adaptability'
  };
  return anchorMap[filename] || '';
}

function processContent(text) {
  let inCodeBlock = false;
  const lines = text.split('\n');
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      // 1. Shift headers by +2 levels
      if (line.match(/^#+\s/)) {
        line = '##' + line;
      }

      // 2. Remove "Deep-dive" blockquotes completely
      if (line.match(/^>.*Deep-dive document/i)) {
        continue; // Skip this line
      }
      
      // Also remove empty lines that follow the blockquote (cleanup)
      if (processedLines.length > 0 && processedLines[processedLines.length - 1] === '' && line === '') {
         // keep it to 1 blank line max
         // wait, a simple regex over the whole text might be easier for links, but line-by-line is fine.
      }

      // 3. Rewrite internal markdown links: [Text](./01-model-architectures.md) -> [Text](#l1-model-architectures)
      // Matches [Text](something.md) or [Text](./something.md)
      line = line.replace(/\[([^\]]+)\]\((?:\.\/)?([^)]+\.md)\)/g, (match, linkText, filename) => {
        const anchor = getAnchor(filename);
        if (anchor) {
          return `[${linkText}](${anchor})`;
        }
        // If it points to overview, just remove the link or replace it with a jump to top
        if (filename.includes('overview.md') || filename === 'index.md') {
          return `[${linkText}](#-ai-building-blocks-overview)`;
        }
        return match; // fallback
      });
    }

    processedLines.push(line);
  }

  // Final cleanup for any leftover isolated overview references
  return processedLines.join('\n').replace(/For the high-level overview, see \[.*?\]\(.*?\)/g, '');
}

indexContent += '\n\n## 🥞 AI Stack Layers\n\n';
for (const file of layers) {
  const filePath = path.join(docsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = processContent(content);
    indexContent += content + '\n\n';
    fs.unlinkSync(filePath);
  }
}

indexContent += '\n\n## 🌱 Living Stack Tiers\n\n';
for (const file of tiers) {
  const filePath = path.join(docsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = processContent(content);
    indexContent += content + '\n\n';
    fs.unlinkSync(filePath);
  }
}

fs.writeFileSync(indexFile, indexContent);
console.log('Successfully merged, shifted headers, and resolved internal links.');
