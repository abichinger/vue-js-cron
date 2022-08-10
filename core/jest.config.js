/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {

  coverageProvider: 'v8',

  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    // tell Jest to handle `*.vue` files
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
  // transformIgnorePatterns: ['<rootDir>/node_modules/']
}
