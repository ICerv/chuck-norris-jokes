module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^theme$': '<rootDir>/src/theme.ts',
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(png|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.ts',
  },
  testEnvironment: 'jsdom', // Simulate a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(module-to-transform|another-module)/)', // Allow transforming specific node_modules
  ],
};
