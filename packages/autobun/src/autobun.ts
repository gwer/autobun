#!/usr/bin/env bun

import { watch, build } from './build';
import server from './server';

const command = process.argv[2] || 'start';

async function start() {
  const serverInstance = Bun.serve(server({ dev: false }));
  console.log(`Server started at: ${serverInstance.url.href}`);

  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT signal. Shutting down...');
    serverInstance.stop();
    process.exit(0);
  });
}

async function dev() {
  await watch();
  const serverInstance = Bun.serve(server({ dev: true }));
  console.log(`Dev server started at: ${serverInstance.url.href}`);

  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT signal. Shutting down...');
    serverInstance.stop();
    process.exit(0);
  });
}

switch (command) {
  case 'start':
    await start();
    break;
  case 'dev':
    await dev();
    break;
  case 'build':
    await build();
    console.log('Build completed successfully');
    process.exit(0);
    break;
  default:
    console.error('Unknown command. Available commands: start, dev, build');
    process.exit(1);
}
