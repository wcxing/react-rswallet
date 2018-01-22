/* eslint-disable */
/**
 * 参考链接： https://www.jianshu.com/p/42e11515c10f
 * 1、npm init 初始化
 * 2、安装 webpack
 * 3、配置 devtool
 * 4、构建本地服务 dev-server
 * 5、配置loader
 * 6、配置plugin
 */
/**
 * es5 的写法
 */
// var path = require('path')
// var webpack = require('webpack')

/**
* es6 的写法 import
*/
import path from 'path'
import webpack from './node_modules/webpack'


/**
 * 使用 html-webpack-plugin 插件自动生成html模板
 */
import HtmlWebpackPlugin from 'html-webpack-plugin'

/**
 * 将所有入口中引用的css文件，移动到独立分离的css文件。
 * 样式将不再内嵌到js bundle 中
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin'

/**
 * 删除构建后dist文件夹中冗余文件 一般用于生产环境 开发环境一般不生成代码到dist
 */
import CleanWebpackPlugin from 'clean-webpack-plugin'

/**
 * 代码分离
 * 1、入口起点（会导致各个bundle中有重复代码）
 * 2、防止重复 使用 commonsChunkPlugin 插件。将公共依赖模块提取到已有的入口chunk中，或者提取到一个新生成的chunk
 * 3、动态导入，a、ECNAScript提案 import（）  b、使用webpack特定的 require.ensure
 * 注： 所谓动态导入，使用后效果为 在页面中动态导入的文件的 script 的标签中有了 async 的属性
 */

/**
 * context 决定了从哪里开始查找入口文件
 */
const context = path.resolve(__dirname, './src')
let config = {
  // context,
  /* 入口配置 */
 /*  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './src/index.js'),
    path.resolve(__dirname, './src/another-index.js')
  ], */
  entry: {
    babel: 'babel-polyfill',
    index: './src/index.js',
    // another: './src/another-index.js'
  },
  /* 输出配置 */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },

  watch: true,

  /**
   * 四个选项 'source-map' 'cheap-moudle-source-map' 'eval-source-map' 'cheap-moudle-eval-source-map'
   * 开发环境推荐 'eval-source-map'
   */
  // devtool: 'eval-source-map',

  module: {
    /** loaders需要单独安装并且需要在webpack.config.js文件中的modules关键字下进性配置
     * test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
     * loader：loader的名称（必须）
     * include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
     * query: 为loader提供额外的设置选项（可选）
     */
    loaders: [
      {
        test: /\.js$/,
        // options: {
        //   configFile: path.resolve(__dirname, '.eslintrc'),
        // },
        loaders: ['babel-loader', 'eslint-loader'],  // eslint-loader 告诉webpack使用eslint检测代码
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        /* use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ], */
        /* use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }), */
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                getLocalIdent: (context, localIdentName, localName, options) => {
                            return localName
                        }
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/i,
        loader: 'url-loader'
      }
    ]
  },
  
  /**
   * 插件配置
   */
  plugins: [
    /**
     * extract-text-webpack-plugin 插件
     */
    // new ExtractTextPlugin('style.css'),
    new ExtractTextPlugin('[name].css?[contenthash]'), // css 单独缓存没有 热替换 

    /**
     * 自动生成 html 模板
     */
    new HtmlWebpackPlugin({
      // 指定模板文件
      template: path.join(__dirname,'./_index.html')
    }),

    /**
     * 清除dist文件夹下冗余文件
     */
    new CleanWebpackPlugin('dist/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),

    /**
     * 模块热替换
     */
    new webpack.HotModuleReplacementPlugin(),

    /**
     * commonsChunkPlugin 代码分离
     * 
     */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common'  // 指定公共 bundle 的名称
    // })
  ]
}

// module.exports = config

export default config

