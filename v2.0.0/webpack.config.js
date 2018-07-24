const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const moduleConfig = require("./build/module.config.js")

console.log(moduleConfig)
let config = {
    entry: {
        bundle: './main.js'
    },
    output: {
        filename: '[name].js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'index.html'
        })
    ],
    module: moduleConfig
}    

if (isDev) {
    config.devtool = 'inline-source-map';
    config.devServer = {
        contentBase: path.join(__dirname, "dist"),
        port: 8000,
        host: '127.0.0.1',
        overlay: {
            errors: true
        },
        open: true,
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    );

    config.optimization = {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: { // key 为entry中定义的 入口名称
                    test: /\.\/ /,
                    priority: -10
                }
            }
        }
    }
}



module.exports = config;
