#!/usr/bin/env bun

import { existsSync } from 'fs';
import path from 'path';
import prompts from 'prompts';

const TEMPLATE_DIR = path.join(import.meta.dir, 'template');

async function main() {
  const args = process.argv.slice(2);
  let projectName = args[0];

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-autobun-app',
      validate: (value) => {
        if (!value.trim()) return 'Project name is required';
        if (!/^[a-zA-Z0-9-_]+$/.test(value))
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        return true;
      },
    });

    if (!response.projectName) {
      console.log('Project creation cancelled');
      process.exit(0);
    }

    projectName = response.projectName;
  }

  const targetDir = path.resolve(projectName);

  if (existsSync(targetDir)) {
    console.error(`Directory "${projectName}" already exists`);
    process.exit(1);
  }

  console.log(`Creating Autobun app in ${targetDir}...`);

  await copyTemplate(TEMPLATE_DIR, targetDir, projectName);

  console.log('\nDone! Your Autobun app is ready.');
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  bun install`);
  console.log(`  bun run dev`);
  console.log(`\nHappy coding!`);
}

async function copyTemplate(
  templateDir: string,
  targetDir: string,
  projectName: string
) {
  const fs = await import('fs');
  const { glob } = await import('glob');

  const templateFiles = glob.sync('**/*', {
    cwd: templateDir,
    nodir: true,
    dot: true,
  });

  for (const file of templateFiles) {
    const src = path.join(templateDir, file);
    const dest = path.join(targetDir, file);

    const dir = path.dirname(dest);

    if (!existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let content = await Bun.file(src).text();
    let finalDest = dest;

    if (file === 'package.json') {
      content = content.replace(
        '"name": "template"',
        `"name": "${projectName}"`
      );
    }

    if (file === '_gitignore') {
      finalDest = path.join(targetDir, '.gitignore');
    }

    await Bun.write(finalDest, content);
  }
}

main().catch(console.error);
