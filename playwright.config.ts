import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 900000, // Global timeout for each test
  workers: 1, // Run tests sequentially (you can increase in CI)
  use: {
    storageState: 'auth.json',
    headless: false,
    channel: 'chrome',
    viewport: null,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    // navigationTimeout: 60000,
    // actionTimeout: 15000,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }]
  ]
});
