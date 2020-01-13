const rootDir = '..';
const { moduleNameMapper } = require('../aliases');

module.exports = {
  collectCoverage: true,
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
