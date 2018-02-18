const path = require('path');

module.exports = {
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'transform-loader?brfs',
      },
    ],
  },
  output: {
    path: path.resolve(`${__dirname}/build/`),
    filename: 'bundle.js',
  },
};
