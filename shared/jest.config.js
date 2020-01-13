const rootDir = '..';
const { moduleNameMapper } = require('../aliases');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '!src/sharedAppContext.js',
    '!src/**/ContactFactory.js',
    '!src/**/getScannerMockInterface.js',
    '!src/business/test/**/*.js',
    '!src/proxies/**/*.js',
    '!src/tools/**/*.js',
    '!src/test/**/*.js',
    '!src/**/*_.js',
    'src/**/*.js',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  moduleNameMapper,
  rootDir,
  verbose: true,
};
