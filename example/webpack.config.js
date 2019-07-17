const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'transform-loader?brfs',
      },
    ],
  },
  output: {
    path: path.resolve(`${__dirname}/build/`),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
};
