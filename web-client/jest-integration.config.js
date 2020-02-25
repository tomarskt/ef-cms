const rootDir = '..';
const baseConfig = require('../jest.config');

module.exports = {
  ...baseConfig,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/presenter/**/*.js',
    '!integration/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageDirectory: './coverage-integration',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
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
