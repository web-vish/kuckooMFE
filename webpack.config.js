const packageJson = require("./package.json");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js|jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            },
            {
                test: /\.s[ac]ss?$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html?$/i,
                loader: "html-loader"
            },
            {
                test: /\.svg|png$/i,
                loader: "url-loader"
            }

        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "KuckooMFE",
            filename: "remoteEntry.js",
            exposes: {
            },
            remotes:{
                PostExposeComponent:"PostExposeComponent@http://localhost:8081/remoteEntry.js",
                UserComponent: "UserComponent@http://localhost:8082/remoteEntry.js",
                NotifyComponent: "NotifyComponent@http://localhost:8083/remoteEntry.js",
                ProductList: "ProductList@http://localhost:8084/remoteEntry.js"
                
            },
            shared: {
                ...packageJson.dependencies,
                ...packageJson.peerDependencies,
                ...packageJson.devDependencies
            }
        }),
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico"
        })
    ]
}