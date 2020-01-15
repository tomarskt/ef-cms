const rootDir = '..';
const { moduleNameMapper } = require('../aliases');

module.exports = {
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
  moduleNameMapper,
  rootDir,
  testEnvironment: 'node',
  //this is to ignore imported html files
  transform: {
    '^.+\\.html?$': '../web-client/htmlLoader.js',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
};
