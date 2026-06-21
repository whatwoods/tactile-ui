import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const LIMITS = [
  { file: 'dist/index.js', gzipLimitKb: 20 },
  { file: 'dist/style.css', gzipLimitKb: 20 },
];

const failures = [];

for (const item of LIMITS) {
  const source = await readFile(item.file);
  const gzipKb = gzipSync(source).byteLength / 1024;
  const display = gzipKb.toFixed(2);
  console.log(`${item.file}: ${display} kB gzip (limit ${item.gzipLimitKb} kB)`);
  if (gzipKb > item.gzipLimitKb) {
    failures.push(`${item.file} is ${display} kB gzip, over ${item.gzipLimitKb} kB`);
  }
}

if (failures.length > 0) {
  console.error('Package size check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Package size check passed.');
