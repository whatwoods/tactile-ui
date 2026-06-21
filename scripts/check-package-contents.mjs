import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const requiredFiles = [
  'dist/index.js',
  'dist/style.css',
  'dist/types/index.d.ts',
];

const forbiddenFiles = [
  'dist/index.html',
  'dist/favicon.svg',
  'dist/mock_qr_code.png',
];

const exists = async (relativePath) => {
  try {
    await access(join(ROOT, relativePath), constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const missing = [];
for (const file of requiredFiles) {
  if (!(await exists(file))) {
    missing.push(file);
  }
}

const forbidden = [];
for (const file of forbiddenFiles) {
  if (await exists(file)) {
    forbidden.push(file);
  }
}

if (missing.length === 0 && forbidden.length === 0) {
  console.log('Package contents check passed.');
  process.exit(0);
}

if (missing.length > 0) {
  console.error('Missing required package files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
}

if (forbidden.length > 0) {
  console.error('Demo/runtime-app files must not be published from dist/:');
  for (const file of forbidden) {
    console.error(`- ${file}`);
  }
}

process.exit(1);
