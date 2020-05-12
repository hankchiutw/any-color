module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock', 'jest-webextension-mock'],
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src/$1',
  },
};
