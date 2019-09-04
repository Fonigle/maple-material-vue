/// <reference path="../@types/vue-loader/index.d.ts" />

import * as path from 'path';
import * as VueLoaderPlugin from 'vue-loader/lib/plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const mode = process.env.MODE;
const isProduction = (mode === "production");

module.exports = {
    output: {
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".ts"],
        alias: {
            vue$: "vue/dist/vue.runtime.esm.js",
            "@": path.resolve("src"),
            mixins: path.resolve("src/mixins")
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
        },
        {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }
            ]
        },
        {
            test: /\.tsx$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        appendTsxSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }
            ]
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: !isProduction,
                    },
                },
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: !isProduction
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: !isProduction,
                        sassOptions: {
                            importer: function (url: string) {
                                if (url.indexOf('@material') === 0) {
                                    const filePath = url.split('@material')[1];
                                    const nodeModulePath = './node_modules/@material/' + filePath;
                                    return { file: require('path').resolve(nodeModulePath) };
                                }

                                if (url.indexOf('material-components-web') === 0) {
                                    const nodeModulePath = './node_modules/material-components-web/material-components-web';
                                    return { file: require('path').resolve(nodeModulePath) };
                                }

                                return { file: url };
                            }
                        }
                    }
                },
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            include: /image/,
            loader: "url-loader",
            query: {
                limit: 1024,
                name: "asset/images/[hash:16].[ext]"
            }
        },
        {
            test: /\.(ttf|woff2?|eot|svg)$/,
            include: /icon|font/,
            loader: "url-loader",
            query: {
                limit: 1024,
                name: "asset/fonts/[name].[hash:7].[ext]"
            }
        }]
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: isProduction,
            vue: true,
            // workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
};
