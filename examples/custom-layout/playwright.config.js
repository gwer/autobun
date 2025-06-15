const { defineConfig } = require('@playwright/test');

const port = 3003;
const appName = 'sample-app';

module.exports = defineConfig({
  name: appName,
  testDir: `./tests`,
  use: {
    baseURL: `http://localhost:${port}`,
  },
  webServer: {
    command: `bun run build && bun run start`,
    url: `http://localhost:${port}`,
    timeout: 10000,
    env: {
      PORT: port.toString(),
      NODE_ENV: 'test',
    },
  },
});
