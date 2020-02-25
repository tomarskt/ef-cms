const rootDir = '..';
const baseConfig = require('../jest.config');

module.exports = {
  ...baseConfig,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!e2e/**/*.js', '!src/**/*.test.js'],
  coverageDirectory: './coverage-unit',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 40,
      lines: 45,
      statements: 45,
    },
  },
  globals: {
    window: true,
  },
  rootDir,
  testEnvironment: 'node',
  transform: {
    //this is to ignore imported html files
    '^.+\\.html?$': './web-client/htmlLoader.js',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
};
