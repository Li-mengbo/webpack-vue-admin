var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// 提取css
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩CSS和JS代码
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports  = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map', // 压缩方式
    module: {
        rules: [
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader',
                  'sass-loader',
                  'postcss-loader'
                ]
            },
            {
            test: /\.less$/,
            use: [
                {
                loader: MiniCssExtractPlugin.loader,
                },
                'css-loader',
                'less-loader',
                'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //清除多余dist文件
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        }), // 配置请求地址
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }), // 分离css
    ],
    optimization: {
        // ...省略号
        minimizer: [
          // 压缩JS
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false, // 去除警告
                drop_debugger: true, // 去除debugger
                drop_console: true // 去除console.log
              },
            },
            cache: true, // 开启缓存
            parallel: true, // 平行压缩
            sourceMap: false // set to true if you want JS source maps
          }),
          // 压缩css
          new OptimizeCSSAssetsPlugin({})
        ]
    },
})