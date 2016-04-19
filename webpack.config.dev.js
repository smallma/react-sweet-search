var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
     path.join(__dirname, 'app/app.js') // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'dist/js/'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass"],
        include: path.join(__dirname, 'app/sass'),
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new ExtractTextPlugin('bundle.css')
  ],
};