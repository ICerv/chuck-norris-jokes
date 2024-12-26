module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for transforming JS/TS files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts', // Mock image imports
  },
  testEnvironment: 'jsdom', // Simulate a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Add custom Jest setup
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
