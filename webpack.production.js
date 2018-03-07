const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.common.js')

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin([
            'build'
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template.html'),
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                minifyCSS: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
})
