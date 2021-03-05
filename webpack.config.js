const path = require('path')
const webpack = require('webpack')
const pkg = require('./package')

module.exports = {
    mode: 'production',
    entry: {
        chat: './index.js'
    },
    output: {
        filename: '[name].' + pkg.version + '.min.js',
        path: path.resolve(__dirname, 'docs/lib'),
        libraryTarget: 'window'
    },
    plugins: [
        new webpack.DefinePlugin({
            npm_package_date:    JSON.stringify(Date.now()),
            npm_package_name:    JSON.stringify(pkg.name),
            npm_package_version: JSON.stringify(pkg.version)
        })
    ]
}