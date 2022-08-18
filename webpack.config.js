const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].bundle.js",
        clean: true

    },

    devServer: {
        static: path.resolve(__dirname, "dist"),
        open: true,
        hot: true
    },

    devtool: "inline-source-map",


    //loaders
    module: {
        rules: [
            {test: /\.css$/, use:["style-loader", "css-loader"]},//imported
            {test:/\.(svg|png|jpeg|jpg)$/, type: "asset/resource"}//built in
        ]
    },

    //plugins

    plugins: [
        new HtmlWebpackPlugin({
            title: "todolist",
            filename: "index.html",
            template: path.resolve(__dirname,"src/temp.html")
        })
    ]
}