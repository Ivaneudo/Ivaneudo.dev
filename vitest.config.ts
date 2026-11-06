import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // <-- Aponta para o arquivo de setup
    globals: true,
    coverage: {
      provider: 'v8', // ou 'istanbul'
      include: ['src/**/*.{ts,tsx}'], // <-- AQUI: todos os fontes entram no relatório
      exclude: [
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        'src/**/__tests__/**',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
    },
  },
})