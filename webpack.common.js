var glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let entries = getEntry('src/js/**/*.js', 'src/js/');
let chunks = Object.keys(entries);
let config = {
  entry: entries,
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: 'static'
      }
    ]),
    new ExtractTextPlugin('css/[name].[contenthash:6].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: chunks,
      minChunks: chunks.length // 提取所有entry共同依赖的模块
    })
  ],
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader:'css-loader',
              options: {
                modules: true, //设置css局部作用域
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
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
              }/*,ios bug
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }*/
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
    // jquery: 'jQuery'
  }
};

var pages = Object.keys(getEntry('src/**/*.html', 'src/'))
pages.forEach(function (pathname) {
  var conf = {
    filename: pathname + '.html', // 生成的html存放路径，相对于path
    template: __dirname + '/src/' + pathname + '.html', // html模板路径
    inject: 'body' // js插入的位置，true/'head'/'body'/false
    /*
     * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
     * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
     * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
     * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
     */
    // minify: { //压缩HTML文件
    //  removeComments: true, //移除HTML中的注释
    //  collapseWhitespace: false //删除空白符与换行符
    // }
  }
  if (pathname in config.entry) {
    conf.favicon = path.resolve(__dirname, './src/images/logo.jpg');
    conf.inject = 'body';
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
    conf.showErrors = true;
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = config;

function getEntry(globPath, pathDir) {
    //get from github code 
    var files = glob.sync(globPath);
    var entries = {},
        entry,        //文件
        dirname,    //
        basename,    //文件名
        pathname,    //
        extname;    //文件扩展名

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);    //返回路径中代表文件夹的部分
        //console.log("dirname返回路径中代表文件夹的部分:==>"+dirname);
        extname = path.extname(entry);    //返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。
        //console.log("extname返回路径中文件的后缀名:==>"+extname);
        basename = path.basename(entry, extname);    //返回路径中的最后一部分
        //console.log("basename返回路径中的最后一部分:==>"+basename);
        pathname = path.normalize(path.join(dirname,  basename));    //规范化路径
        //console.log("pathname规范化路径:==>"+pathname);
        pathDir = path.normalize(pathDir);    //规范化路径
        //console.log("pathDir规范化路径:==>"+pathDir);
        if(pathname.startsWith(pathDir)){
            pathname = pathname.substring(pathDir.length);
            //console.log("pathname判断后:==>"+pathname);   
        };
        entries[pathname] = './' + entry;
    }
    console.log(entries);
    return entries;
}