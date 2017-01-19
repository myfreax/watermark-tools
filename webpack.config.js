/**
 * Created by Freax on 17-1-3.
 * @blog http://www.myfreax.com
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [
        'webpack-hot-middleware/client?noInfo=false&reload=true',   //require
        path.resolve(__dirname, 'src/index.js')                       //entry
    ],
    output: {
        publicPath: "/",    //require
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, // use ! to chain loaders
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
            {test:/\.js$/,loader:'webpack-module-hot-accept'}
        ]
    },
    devtool: 'eval-source-map',
    // 第三方类库直接引用，不用打包
    externals: {
        "angular": "angular",
        "angular-resource": "ngResource",
        "$": "jQuery",
        "fabric": 'fabric'
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html', //
            inject:true
        })
    ],
    resolveLoader: {    //指定解释器载入的路径，可以是bower，webComponent
        root: path.join(__dirname, 'node_modules')
    }
};