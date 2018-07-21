const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

const paths = {
  root: path.resolve(__dirname, '../'),
  dist: path.resolve(__dirname, '../dist'),
  src: path.resolve(__dirname, '../js'),
};

module.exports = {
  entry: [
    path.join(paths.src, 'main.js'),
    path.join(paths.src, 'dbhelper.js'),
    path.join(paths.src, 'restaurant_info.js'),
    path.join(paths.src, 'sw_register.js'),
    path.join(paths.src, 'idb.js'),
    path.join(paths.root, 'sw.js'),
  ],

  // NOTE: check https://webpack.js.org/configuration/devtool/
  // and https://github.com/webpack/webpack/tree/master/examples/source-map
  // and https://lorefnon.me/2016/12/03/on-webpack-and-source-map-integration.html
  devtool: 'cheap-modules-source-map',

  // NOTE: https://webpack.js.org/configuration/output/#output-filename
  output: {
    path: paths.root,
    filename: '[name].bundle.js',
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     hash: false,
  //     template: './index.html',
  //     title: 'Restaurant Reviews',
  //     chunksSortMode: 'manual',
  //     chunks: [ 'idb', 'dbhelper', 'main', 'sw_register'],
  //     filename: 'index.html',
  //     inject: false
  //   }),
  //   new HtmlWebpackPlugin({
  //     hash: false,
  //     template: './restaurant.html',
  //     title: 'Restaurant Info',
  //     chunksSortMode: 'manual',
  //     chunks: ['idb', 'dbhelper', 'restaurant', 'sw_register'],
  //     filename: 'restaurant.html',
  //     inject: false
  //   }),
  //   new CopyWebpackPlugin([
  //     { from: './img/', to: './img/'},
  //   ]),
  //   new ExtractTextWebpackPlugin("./style.css"),
  //   new UglifyWebpackPlugin({
  //     sourceMap: true
  //   })
  // ],
  resolve: {
    extensions: ['.js'],
    alias: {
      js: path.resolve(paths.root, 'js'),
      css: path.resolve(paths.root, 'css'),
      main: path.resolve(paths.root, './'),
      img: path.resolve(paths.root, 'img'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  'env',
                  {
                    targets: {
                      browsers: ['last 3 versions', 'ie >= 11'],
                    },
                  },
                ],
              ],
            },
          },
        ],
        exclude: [
          path.resolve(paths.root, 'node_modules'),
          path.resolve(paths.root, 'server/node_modules'),
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextWebpackPlugin.extract({
      //     use: "css-loader",
      //     fallback: "style-loader"
      //   })
      // },
      // { test: /\.jpg$/, use: [ "file-loader" ] },
      // {
      //   test: /\.html$/,
      //   use: [ {
      //     loader: 'html-loader',
      //     options: {
      //       minimize: true
      //     }
      //   }],
      // },
    ]
  }
};
