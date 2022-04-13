const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: path.join(__dirname, 'tests', 'env.js'),
};
