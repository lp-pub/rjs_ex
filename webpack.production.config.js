var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var locals = {
    routes: [
        '/',
    ]
};

module.exports = {
  entry: [__dirname + '/app/index.js', __dirname + '/app/stylesheets/app.scss'],
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
          },
          { // regular css files
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({
                  loader: 'css-loader?importLoaders=1',
              })
          },
          { // sass / scss loader for webpack
              test: /\.(sass|scss)$/,
              loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          }
      ]
  },
  output: {
    path: __dirname + '/production',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },

  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin({ // define where to save the file
        filename: 'dist/[name].bundle.css',
        allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
