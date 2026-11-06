module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Configurações de Coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/main.jsx'
  ],
  coverageDirectory: 'coverage',
  // Útil se você usar CSS Modules ou importar imagens (Mock)
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // Habilita o serializador do Emotion para snapshots limpos
  snapshotSerializers: ['@emotion/jest/serializer'],
};