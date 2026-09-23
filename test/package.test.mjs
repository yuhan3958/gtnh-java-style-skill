import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('..', import.meta.url);

async function text(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('package exposes exactly one npx-friendly executable', async () => {
  const pkg = JSON.parse(await text('./package.json'));
  assert.equal(pkg.name, 'gtnh-java-style-skill');
  assert.deepEqual(pkg.bin, { 'gtnh-java-style-skill': './bin/cli.mjs' });
  assert.equal(pkg.type, 'module');
  assert.ok(pkg.files.includes('skill'));
  assert.ok(pkg.files.includes('bin'));
});

test('skill frontmatter follows Agent Skills naming constraints', async () => {
  const skill = await text('./skill/SKILL.md');
  assert.match(skill, /^---\nname: gtnh-java-style\n/);
  assert.match(skill, /description: Use when /);
  assert.match(skill, /license: CC-BY-SA-4\.0/);
  assert.match(skill, /references\/style-guide\.md/);
});

test('reference captures key GTNH rules', async () => {
  const ref = await text('./skill/references/style-guide.md');
  for (const phrase of [
    '2000 lines',
    'beginning of blocks',
    'modern switch',
    'one write call per line',
    '@Deprecated',
    'parentheses',
  ]) {
    assert.match(ref, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'i'));
  }
});
