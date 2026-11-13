#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

function getAllFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(full, files);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const files = getAllFiles(SRC_DIR);
const errors = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, 'utf8');

  // 1. Check for dangerous DOM patterns
  if (content.includes('dangerouslySetInnerHTML')) {
    errors.push(`${rel}: Forbidden use of dangerouslySetInnerHTML.`);
  }
  if (/\beval\s*\(/.test(content)) {
    errors.push(`${rel}: Forbidden use of eval().`);
  }

  // 2. Check for leftover console.log debugging in src/
  if (/\bconsole\.(log|debug)\s*\(/.test(content)) {
    errors.push(`${rel}: Leftover console.log/debug statement found.`);
  }

  // 3. Check that every <img has an alt= attribute
  const imgMatches = content.match(/<img\b[^>]*>/g) || [];
  for (const tag of imgMatches) {
    if (!/\balt=/.test(tag)) {
      errors.push(`${rel}: <img> element missing alt attribute: ${tag}`);
    }
  }

  // 4. Check that every <button has an explicit type= attribute
  const btnMatches = content.match(/<button\b[^>]*>/g) || [];
  for (const tag of btnMatches) {
    if (!/\btype=/.test(tag)) {
      errors.push(`${rel}: <button> element missing explicit type attribute: ${tag}`);
    }
  }

  // 5. Check for accidental secret exposure in client components
  if (content.includes("'use client'") || content.includes('"use client"')) {
    if (/process\.env\.(?!NEXT_PUBLIC_|NODE_ENV)/.test(content)) {
      errors.push(`${rel}: Server environment variable referenced in client component.`);
    }
  }
}

if (errors.length > 0) {
  console.error('JGS Static Lint & Security Check Failed:');
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
}

console.log(`✓ JGS Lint & Security Check passed across ${files.length} TypeScript/React source files (0 errors, 0 warnings).`);
