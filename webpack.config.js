var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
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
        filename: 'transformed.js',
        path: __dirname + '/build'
    },
    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new ExtractTextPlugin({ // define where to save the file
            filename: 'dist/[name].bundle.css',
            allChunks: true,
        })
    ]
},
{

};
