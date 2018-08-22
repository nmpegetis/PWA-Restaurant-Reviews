const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

const paths = {
  root: path.resolve(__dirname, '../'),
  dist: path.resolve(__dirname, '../dist'),
  js: path.resolve(__dirname, '../js'),
};

module.exports = {
  entry: {
    main: path.join(paths.js, 'main.js'),
    dbhelper: path.join(paths.js, 'dbhelper.js'),
    idbhandler: path.join(paths.js, 'idbhandler.js'),
    restaurant: path.join(paths.js, 'restaurant_info.js'),
    sw_register: path.join(paths.js, 'sw_register.js'),
    idb: path.join(paths.root, './node_modules/idb/lib/idb.js'),
    maps: path.join(paths.root, './node_modules/mapbox-gl/dist/mapbox-gl.js'),
    sw: path.join(paths.root, 'sw.js'),
  },

  // NOTE: check https://webpack.js.org/configuration/devtool/
  // and https://github.com/webpack/webpack/tree/master/examples/source-map
  // and https://lorefnon.me/2016/12/03/on-webpack-and-source-map-integration.html
  devtool: 'cheap-modules-source-map',

  // NOTE: https://webpack.js.org/configuration/output/#output-filename
  output: {
    path: paths.dist,
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.html',
      title: 'Restaurant Reviews',
      chunksSortMode: 'manual',
      chunks: ['main', 'dbhelper', 'sw_register', 'idb', 'maps', 'sw'],
      filename: 'index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './restaurant.html',
      title: 'Restaurant Info',
      chunksSortMode: 'manual',
      chunks: ['restuarant', 'dbhelper', 'sw_register', 'idb', 'maps', 'sw'],
      filename: 'restaurant.html',
      inject: false,
    }),
    new ExtractTextWebpackPlugin('./style.css'),
    new UglifyWebpackPlugin({
      sourceMap: true,
    }),
  ],
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
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
      { test: /\.jpg$/, use: ['file-loader'] },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
