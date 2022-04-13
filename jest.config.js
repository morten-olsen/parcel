const path = require('path');

module.exports = {
  preset: 'ts-jest',
  //testEnvironment: 'node',
  testEnvironment: path.join(__dirname, 'tests', 'env-ts.js'),
};
