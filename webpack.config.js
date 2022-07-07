const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",

    output: {
        clean: true,
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
                loader: 'file-loader'
            }
        ],
    },

    optimization: {},

    plugins: [
        new HtmlWebPackPlugin({
            title: "Mi Webpack App",
            filename: "index.html", //opsional, ya viene por defecto asi
            template: "./src/index.html",
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
            ],
        })
    ],
};