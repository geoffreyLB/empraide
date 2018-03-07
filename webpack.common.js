const path = require('path')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src')
            ]
        }]
    }
}
