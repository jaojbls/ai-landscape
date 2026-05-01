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

// Function to shift all headers by +2 levels, IGNORING code blocks!
function shiftHeaders(text) {
  let inCodeBlock = false;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }
    if (!inCodeBlock && lines[i].match(/^#+\s/)) {
      lines[i] = '##' + lines[i];
    }
  }
  return lines.join('\n');
}

indexContent += '\n\n## AI Stack Layers\n\n';
for (const file of layers) {
  const filePath = path.join(docsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = shiftHeaders(content);
    indexContent += content + '\n\n---\n\n';
    fs.unlinkSync(filePath);
  }
}

indexContent += '\n\n## Living Stack Tiers\n\n';
for (const file of tiers) {
  const filePath = path.join(docsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = shiftHeaders(content);
    indexContent += content + '\n\n---\n\n';
    fs.unlinkSync(filePath);
  }
}

fs.writeFileSync(indexFile, indexContent);
console.log('Successfully merged and shifted headers for single-page build.');
