module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFiles: ['jest-canvas-mock', 'jest-webextension-mock'],
  transformIgnorePatterns: ['node_modules/(?!(lit-element|lit-html)/)'],
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
