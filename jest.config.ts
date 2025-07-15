import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  transformIgnorePatterns: ['/node_modules/(?!react-select)'],
  testPathIgnorePatterns: ['<rootDir>/src/tests/e2e/'],
};

export default config;
