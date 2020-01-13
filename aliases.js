const { alias } = require('./package.json');

// https://jestjs.io/docs/en/configuration.html#rootdir-string
// https://jestjs.io/docs/en/configuration.html#modulenamemapper-objectstring-string
/**
 * takes the `alias` object from the package.json which contains a string => string mapping
 * generates a simple regex mapping according to jest config

 {
  "moduleNameMapper": {
    "^myAlias(.*)": "<rootDir>/$1"
  }
}
 */
const moduleNameMapper = {};
for (let [key, value] of Object.entries(alias)) {
  const newKey = `^${key}/(.*)`;
  const newValue = `${value.replace(/^\./, '<rootDir>')}/$1`;
  moduleNameMapper[newKey] = newValue;
}

module.exports = { moduleNameMapper };
