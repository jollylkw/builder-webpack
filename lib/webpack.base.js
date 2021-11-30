const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');

const projectRoot = process.cwd()

console.log(projectRoot, 'projectRoot')

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`), // 模板
        filename: `${pageName}.html`, // 指定打包文件名
        chunks: ['vendors', pageName], // 指定chunk
        inject: true, // 
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugin
  }
}

const { entry, htmlWebpackPlugin } = setMPA()

module.exports = {
  entry: entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }, {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader'
        // ]
      },
      {
        test: /.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader', // 预处理器
          'less-loader',
          {
            //  loader: 'postcss-loader', //h 后置处理
            // options: {
            //   postcssOptions: {
            //     plugins: [
            //       require('autoprefixer')({
            //         "browsers": [
            //             "defaults",
            //             "not ie < 11",
            //             "last 2 versions",
            //             "> 1%",
            //             "iOS 7",
            //             "last 3 iOS versions"
            //         ]
            //     })
            //     ]
            //   }
            // plugins: () => {
            //   require('autoprefixer')({
            //     browsers:['last 2 version', '>1%', 'iOS 7'] // 兼容浏览器版本
            //   })
            // }
            // }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
        ]
      },
      {
        test: /.(png|gif|jpg|jpeg|svg)$/,
        use: [
          {
            // loader: 'url-loader',
            loader: 'file-loader',
            options: {
              // limit: 10240
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.(woff|eot|svg|ttf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ].concat(htmlWebpackPlugin)
}