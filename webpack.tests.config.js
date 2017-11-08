var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var host = 'localhost';
var port = 8081;

module.exports = {
  context: __dirname + '/tests',
  entry: {
    javascript: 'mocha-loader!./index.js'
  },
  output: {
    filename: 'test.build.js',
    path: __dirname + '/unit-tests'
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.html$|\.css$/,
            loader: 'file-loader?name=[name].[ext]',
        }
    ]
  },
  devServer: {
    host: host,
    port: port
  },
  devtool: 'source-map'
};
