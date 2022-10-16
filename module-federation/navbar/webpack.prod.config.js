const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/navbarIndex.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js",
        publicPath: "/static/"
    },
    optimization:{
        splitChunks: {
            chunks: "all",
            minSize: 10000
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
            }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
}