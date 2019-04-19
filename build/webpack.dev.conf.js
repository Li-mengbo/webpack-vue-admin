var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var path = require('path');
var webpack = require('webpack');

module.exports  = merge(baseConfig, {
  // 打包方式
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true, //热更新
    contentBase: path.resolve(__dirname, '../dist'), //告诉服务其从哪提供内容
    open: true // 自动打开网页
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: 'vue-style-loader',
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
            loader: 'vue-style-loader',
          },
          'css-loader',
          'less-loader',
          'postcss-loader'
         ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //开启热更新
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }), // 配置请求地址
  ]
})