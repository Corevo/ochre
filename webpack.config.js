var webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    devtool: 'eval',
    entry: {
        index: './app/app'
    },
    output: {
        filename: './public/assets/bin/[name].js'
    },
    module: {
        loaders: [
            {
                test: /app(\/|\\).*\.(js||jsx)$/,
                loader: 'babel',
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        //new CommonsChunkPlugin('./public/common.js'),
        //new webpack.optimize.UglifyJsPlugin({})
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    }
};
