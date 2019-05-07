/// <reference path="../@types/vue-loader/index.d.ts" />

import * as path from 'path';
// import * as glob from 'glob';
import * as VueLoaderPlugin from 'vue-loader/lib/plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'

const mode = process.env.MODE;

//开发环境下不单独提取css
const styleLoader =
    mode === "production" ? MiniCssExtractPlugin.loader : "style-loader";

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
            include: [
                path.resolve("src"),
                path.resolve("dev"),
            ]
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        appendTsxSuffixTo: [/\.vue$/]
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: [styleLoader, "css-loader"]
        },
        {
            test: /\.scss$/,
            use: [
                styleLoader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        // includePaths: glob.sync(
                        //     path.join(__dirname, '**/node_modules/@material')
                        // ).map((dir) => path.dirname(dir)),
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
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            include: /image/,
            loader: "url-loader",
            query: {
                limit: 1,
                name: "asset/images/[hash:16].[ext]"
            }
        },
        {
            test: /\.(ttf|woff2?|eot|svg)$/,
            include: /icon|font/,
            loader: "url-loader",
            query: {
                limit: 1,
                name: "asset/fonts/[name].[hash:7].[ext]"
            }
        }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
