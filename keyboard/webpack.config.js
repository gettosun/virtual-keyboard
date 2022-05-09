const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext][query]'
        /* path: path.resolve(__dirname, 'dist'),
        filename: 'main.js', */
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
                },
                {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                'src/styles/vars.scss',
                                'src/styles/mixins.scss',
                                'src/styles/placeholders.scss',
                                'src/styles/fonts.scss',
                            ]
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index'],
            filename: 'index.html',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    devServer: {
        static: {
            watch: true,
            directory: '**/*.html',
        },
        compress: true,
        port: 3000,
    },
};