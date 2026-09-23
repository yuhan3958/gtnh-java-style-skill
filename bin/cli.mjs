#!/usr/bin/env node

import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(packageRoot, 'skill');
const skillName = 'gtnh-java-style';

function usage() {
  return `Usage: gtnh-java-style-skill [options]\n\n` +
    `Installs the ${skillName} Agent Skill.\n\n` +
    `Options:\n` +
    `  --dir <path>   Parent skills directory (default: ~/.agents/skills)\n` +
    `  --force        Replace an existing installation\n` +
    `  -h, --help     Show this help\n`;
}

function parseArgs(argv) {
  let dir = join(homedir(), '.agents', 'skills');
  let force = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--force') {
      force = true;
    } else if (arg === '--dir') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('--dir requires a path');
      }
      dir = value;
      i += 1;
    } else if (arg === '--help' || arg === '-h') {
      return { help: true, dir, force };
    } else {
      throw new Error(`unknown option: ${arg}`);
    }
  }

  return { help: false, dir, force };
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`error: ${error.message}\n`);
    console.error(usage());
    process.exitCode = 2;
    return;
  }

  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const target = join(options.dir, skillName);
  if (await exists(target)) {
    if (!options.force) {
      console.error(`error: ${target} already exists; use --force to replace it`);
      process.exitCode = 1;
      return;
    }
    await rm(target, { recursive: true, force: true });
  }

  await mkdir(options.dir, { recursive: true });
  await cp(source, target, { recursive: true });
  console.log(`installed ${skillName} -> ${target}`);
}

await main();
