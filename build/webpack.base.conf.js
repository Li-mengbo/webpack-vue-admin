// 存放dev和prod配置
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 提取css
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包第三方库
var AutodllWebpackpackPlugin = require('autodll-webpack-plugin');

module.exports  = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new VueLoaderPlugin(), // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    new AutodllWebpackpackPlugin({
      inject: true,
      debugger: true,
      filename: '[name].js',
      path: './dll',
      entry: {
        vendor: ['vue']
      }
    }), // 单独打包第三方库
    new webpack.optimize.SplitChunksPlugin() // 提取公共代码
  ],
  resolve: {
    // 能够使用户在引入模块时不带扩展
    'extensions': ['.js', '.css', '.vue', 'json'],
    'alias': {
      'vue$': 'vue/dist/vue.esm.js', // 配置vue别名，确保webpack可以找到.vue文件
      '@': path.resolve(__dirname, '../src')
    }
  }
}