import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],

  setupFilesAfterEnv: ['<rootDir>/setupTests.ts', 'next'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.ts',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|scss)$': '<rootDir>/config/cssStub.ts',
    '^components(.*)$': '<rootDir>/components/$1',
    '^utils(.*)$': '<rootDir>/utils/$1',
    '^lib(.*)$': '<rootDir>/lib/$1',
    '^mocks(.*)$': '<rootDir>/mocks/$1',
    '^pages(.*)$': '<rootDir>/pages/$1',
    '^models(.*)$': '<rootDir>/models/$1',
  },
};
export default config;
