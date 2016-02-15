var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        './ts/main.ts'
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/js',
        publicPath: "js/"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                include: [ path.resolve(__dirname, "ts") ],
                test: /\.ts(x?)$/,
                loader: 'babel-loader!ts-loader',
            }
        ]
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};