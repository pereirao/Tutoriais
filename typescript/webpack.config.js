const HTMLWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: false
                    }
                }
            },
            {
                test: /\.ts$/,
                use: { loader: "ts-loader" }
            },
            {
                test: /\.css$/,
                use: { loader: "css-loader" }
            },
        ]
    },
    resolve: {
        extensions: [
            ".ts",
        ]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./build")
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}
