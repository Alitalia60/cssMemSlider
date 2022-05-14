const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.[hash].js',
        clean: true,
    },
    devServer: {
        compress: false,
        port: 4200,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Virtual Keyboard',
            template: './index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|ttf)$/i,
                use: ['file-loader'],
                type: 'asset/resource',
            },
            {
                test: /\.wav$/,
                loader: 'file-loader',
            }
        ],
    },
};