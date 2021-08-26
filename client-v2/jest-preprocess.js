const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
}

const babelJestMd = require('babel-jest');
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

module.exports = babelJest.createTransformer(babelOptions);