import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // <-- Aponta para o arquivo de setup
    globals: true,
  },
});