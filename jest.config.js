const { alias } = require('./package.json');

/**
 * This config file sets up some reasonable defaults, including module aliases.
 * The settings in this file are what are used if a developer is running single tests from
 * the root directory, e.g.
 * npx jest path/to/file.test.js
 */
// https://jestjs.io/docs/en/configuration.html#rootdir-string
// https://jestjs.io/docs/en/configuration.html#modulenamemapper-objectstring-string
const moduleNameMapper = {};
for (let [key, value] of Object.entries(alias)) {
  const newKey = `${key}/(.*)`;
  const newValue = `${value.replace(/^\.\//, '<rootDir>/')}/$1`;
  moduleNameMapper[newKey] = newValue;
}

module.exports = {
  collectCoverage: false, // so that singly-run tests don't output coverage
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
  verbose: true, // for singly-run tests
};
