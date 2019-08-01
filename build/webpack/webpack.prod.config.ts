import * as path from 'path';
import * as merge from 'webpack-merge';

import * as baseCfg from './webpack.base.config';

import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import buddha from './buddha';

module.exports = merge(baseCfg, {
    mode: 'production',
    entry: {
        'maple-material-vue': [path.resolve("src/index.ts")]
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    externals: {
        vue: 'vue',
        'vue-class-component': 'vue-class-component'
    },
    devtool: false,
    stats: false,
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...buddha
                ],
                notes: [],
            }
        }),
    ],
    optimization: {
        splitChunks: false,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                extractComments: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                },
            }),
        ]
    }
})
