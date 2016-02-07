var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './ts/main.ts',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};