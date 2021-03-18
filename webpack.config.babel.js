const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env = {}) => ({
    entry: {
        server: './src/index.ts'
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './[name].js'
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
        extensions: ['.js', '.ts'],
        plugins: [new TsconfigPathsPlugin()]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true
            })
        ]
    },
    plugins: [new ProgressBarPlugin()],
    performance: {
        hints: false,
        maxEntrypointSize: 1512000,
        maxAssetSize: 1512000
    }
});
