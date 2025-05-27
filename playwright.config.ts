import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 200000,
  use: {
    storageState: 'auth2.json',
    headless: false,
    channel: 'chrome',
    viewport: null, // Allow full window
    launchOptions: {
      args: ['--start-maximized'], // 👈 Force full window
    },
  },
  reporter: [['html', { open: 'never' }]],
});
