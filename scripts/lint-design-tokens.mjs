import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, 'src');
const TOKEN_FILE = 'src/styles/tokens.css';

const RAW_VALUE_PATTERN = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|(?:linear|radial|conic)-gradient\(/g;

const BASELINE = new Set();

const cssFiles = [];

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      return;
    }
    if (!entry.name.endsWith('.css')) return;
    const relativePath = relative(ROOT, fullPath);
    if (relativePath === TOKEN_FILE) return;
    cssFiles.push({ fullPath, relativePath });
  }));
};

await walk(SRC_DIR);

const actual = new Map();

for (const file of cssFiles) {
  const source = await readFile(file.fullPath, 'utf8');
  source.split(/\r?\n/).forEach((line, index) => {
    RAW_VALUE_PATTERN.lastIndex = 0;
    if (!RAW_VALUE_PATTERN.test(line)) return;
    const key = `${file.relativePath}::${line.trim()}`;
    if (!actual.has(key)) {
      actual.set(key, []);
    }
    actual.get(key).push(index + 1);
  });
}

const newViolations = [...actual.keys()].filter((key) => !BASELINE.has(key));
const staleBaseline = [...BASELINE].filter((key) => !actual.has(key));

if (newViolations.length === 0 && staleBaseline.length === 0) {
  console.log(`Design token lint passed with ${BASELINE.size} baseline entries.`);
  process.exit(0);
}

if (newViolations.length > 0) {
  console.error('New raw design values found outside src/styles/tokens.css:');
  for (const key of newViolations) {
    const [file, line] = key.split('::');
    console.error(`- ${file}:${actual.get(key).join(',')}: ${line}`);
  }
}

if (staleBaseline.length > 0) {
  console.error('Baseline entries no longer found. Remove them from scripts/lint-design-tokens.mjs:');
  for (const key of staleBaseline) {
    console.error(`- ${key}`);
  }
}

process.exit(1);
