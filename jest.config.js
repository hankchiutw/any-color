module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFiles: ['jest-canvas-mock', 'jest-webextension-mock'],
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src/$1',
  },
};
