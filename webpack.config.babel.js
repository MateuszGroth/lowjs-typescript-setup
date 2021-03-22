const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function excludeCondition(path) {
    const nonEs5SyntaxPackages = ['ws', 'core-js'];

    // DO transpile these packages
    if (nonEs5SyntaxPackages.some(pkg => path.match(pkg))) {
        return false;
    }

    // Ignore all other modules that are in node_modules
    if (path.match(/node_modules/)) {
        return true;
    } else return false;
}

module.exports = (env = {}) => ({
    // es5 so webpack bundles into es5 (function() instead of () =>)
    // node so webpack does not try to bundle built in packages like http, path
    target: ['node', 'es5'],
    entry: {
        server: './src/index.ts'
    },
    // node externals so webpack does not try to bundle external modules like express
    // externals: [nodeExternals()],
    externals: [nodeExternals({ allowlist: ['ws', 'core-js'] })],
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
            },
            {
                test: /\.jsx?$/,
                exclude: excludeCondition,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: 'unambiguous',
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: '3'
                                }
                            ]
                        ]
                    }
                }
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
