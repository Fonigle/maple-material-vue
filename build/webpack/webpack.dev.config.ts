import * as webpack from 'webpack';
import * as path from 'path';
import * as merge from 'webpack-merge';

import * as baseConfig from './webpack.base.config';

import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as HtmlPlugin from 'html-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import * as os from 'os';
const networkInterfaces = os.networkInterfaces();

import buddha from './buddha';

let ip = "";
for (var key in networkInterfaces) {
    networkInterfaces[key].forEach(item => {
        if (!item.internal && item.family === "IPv4") {
            ip = item.address;
        }
    });
}

const port = 11000;

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        host: ip,
        port,
        hot: true,
        open: true,
        historyApiFallback: true,
        quiet: true,
    },
    entry: {
        index: [path.resolve("dev/index.ts")]
    },
    devtool: "#cheap-module-source-map",
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlPlugin({
            filename: "index.html",
            template: path.resolve("dev/index.html"),
            showErrors: true
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...buddha
                ],
                notes: [`Your app is running at: http://${ip}:${port}`,]
            }
        }),
    ]
});
