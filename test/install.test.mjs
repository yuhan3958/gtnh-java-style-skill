import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));
const cli = fileURLToPath(new URL('../bin/cli.mjs', import.meta.url));

function run(args, env = {}) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: repo,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
}

test('installs the GTNH skill into ~/.agents/skills by default', async () => {
  const home = await mkdtemp(join(tmpdir(), 'gtnh-skill-home-'));
  const result = run([], { HOME: home, USERPROFILE: home });

  assert.equal(result.status, 0, result.stderr);

  const target = join(home, '.agents', 'skills', 'gtnh-java-style', 'SKILL.md');
  const body = (await readFile(target, 'utf8')).replace(/\r\n/g, '\n');

  assert.match(body, /^---\nname: gtnh-java-style\n/m);
  assert.match(body, /Spotless/);
});

test('supports an explicit install directory', async () => {
  const root = await mkdtemp(join(tmpdir(), 'gtnh-skill-target-'));
  const result = run(['--dir', root]);

  assert.equal(result.status, 0, result.stderr);
  const installed = join(root, 'gtnh-java-style', 'SKILL.md');
  assert.ok((await stat(installed)).isFile());
});

test('refuses to overwrite without --force', async () => {
  const root = await mkdtemp(join(tmpdir(), 'gtnh-skill-target-'));
  const first = run(['--dir', root]);
  assert.equal(first.status, 0, first.stderr);

  const second = run(['--dir', root]);
  assert.notEqual(second.status, 0);
  assert.match(second.stderr, /already exists/i);
});

test('--force overwrites an existing installation', async () => {
  const root = await mkdtemp(join(tmpdir(), 'gtnh-skill-target-'));
  assert.equal(run(['--dir', root]).status, 0);

  const result = run(['--dir', root, '--force']);
  assert.equal(result.status, 0, result.stderr);
});

test('--help prints usage without installing', () => {
  const result = run(['--help']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--dir/);
  assert.match(result.stdout, /--force/);
});