const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    detail: path.resolve(__dirname, 'src/js/detail.js'),
    list: path.resolve(__dirname, 'src/js/list.js'),
    util: path.resolve(__dirname, 'src/js/util.js')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      hash: true,
      favicon: './src/images/logo.jpg',
      title: 'index',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['list', 'detail']
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/detail.html',
      filename: 'detail.html',
      hash: true,
      favicon: './src/images/logo.jpg',
      title: 'detail',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['index', 'list'],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/list.html',
      filename: 'list.html',
      hash: true,
      favicon: './src/images/logo.jpg',
      title: 'list',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['index', 'detail'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: 'static'
      }
    ]),
    new ExtractTextPlugin('css/[name].[contenthash:6].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'util'
    })
  ],
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader:'css-loader',
            options: {
              modules: true, //设置css局部作用域
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          publicPath: '../' //生成的独立CSS文件中的url图片地址的publicPath,通常JS中的publicPath不一样,如果一样可以不设置
        })
      },
      /*{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }*/
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: '[name]-[hash].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [ "es2015" ]
          }
        }
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  }
};