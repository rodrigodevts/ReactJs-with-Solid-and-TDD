export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
