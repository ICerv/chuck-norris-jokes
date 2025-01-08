module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS/TS files
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1', // Resolve components alias
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^theme$': '<rootDir>/src/theme.ts',
    '\\.(css)$': 'identity-obj-proxy', // Mock CSS module imports
    '\\.(png|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.ts', // Mock image files
  },
  testEnvironment: 'jsdom', // Simulate a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Jest setup files
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Recognized file extensions
  transformIgnorePatterns: [
    'node_modules/(?!(module-to-transform|another-module)/)', // Allow transforming specific node_modules
  ],
};
