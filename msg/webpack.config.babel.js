const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env = {}) => ({
    target: ['web', 'es2017'],
    entry: {
        main: './src/main.ts' // testing purposes
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './[name].js',
        chunkFilename: './[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // use aliases from tsconfig.json
        plugins: [new TsconfigPathsPlugin()]
    },
    optimization: {
        moduleIds: 'deterministic',
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                //All node_modules into vendors.[hash].js
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Messages',
            filename: 'index.html',
            template: `./src/template.ejs`
        }),
        new ProgressBarPlugin()
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 1512000,
        maxAssetSize: 1512000
    }
});
