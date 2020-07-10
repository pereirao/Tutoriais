const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        publicPath: "public",
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    devtool:"eval-source-map",
    resolve: {
        extensions: [
            ".ts",
            ".js"
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: [
                    path.resolve(__dirname, "src")
                ]
            }

        ]
    }
}
