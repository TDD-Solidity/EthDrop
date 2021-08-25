const babelOptions = {
    presets: ['babel-preset-gatsby', '@babel/preset-typescript'], 
  }
  
  // module.exports = require('babel-jest').createTransformer(babelOptions)
  
const babelJestMd = require('babel-jest');
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

module.exports = babelJest.createTransformer(babelOptions);