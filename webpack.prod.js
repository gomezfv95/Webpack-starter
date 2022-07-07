const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports = {
    mode: "production",

    output: {
        clean: true,
        filename: "main.[contenthash].js",
    },

    module: {
        rules: [{
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe|gif|svg)$/,
                loader: "file-loader",
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizer(), new Terser()],
    },

    plugins: [
        new HtmlWebPackPlugin({
            title: "Mi Webpack App",
            filename: "index.html", //opsional, ya viene por defecto asi
            template: "./src/index.html",
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css",
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [{ from: "src/assets/", to: "assets/" }],
        }),
    ],
};