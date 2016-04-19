var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'app/app.js'),
  output: {
    path: path.join(__dirname, 'dist/js/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('style', 'css'),
      // },
    ],
  }
  // plugins: [
  //   new ExtractTextPlugin('bundle.css'),
  // ],
};