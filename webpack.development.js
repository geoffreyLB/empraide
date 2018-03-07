const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')

const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
        port: process.env.PORT,
        open: true,
        overlay: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template.html')
        })
    ]
})
