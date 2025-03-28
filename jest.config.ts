import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    'src/components/Cart/**/*.{ts,tsx}',
    'src/components/BookDetails/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    "!src/main.tsx",
    "!src/utils/API.ts",
    // '!src/**/index.{ts,tsx}',
    // '!src/**/*.{types,d}.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
};

export default config;