const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env = {}) => ({
    // es5 so webpack bundles into es5 (function() instead of () =>)
    // node so webpack does not try to bundle built in packages like http, path
    target: ['node', 'es5'],
    entry: {
        server: './src/index.ts'
    },
    // node externals so webpack does not try to bundle external modules like express
    externals: [nodeExternals()],
    // externals: [nodeExternals({ allowlist: ['ws'] })],
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
        // use aliases from tsconfig.json
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
