var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app/js/main.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        stats: { colors: true },
        hot: true,
        open: true,
        port: 8090,
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                loader: "babel-loader",
                options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-proposal-optional-chaining",
                    "@babel/plugin-proposal-nullish-coalescing-operator"
                ]
                }
            },
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            }     
        ]
    },
    plugins: [
            new HtmlWebpackPlugin({
                title: 'My App',
                template: './app/index.html'
            })
    ]
};