const path = require('path');

const paths = {
  root: path.resolve(__dirname, '../'),
  dist: path.resolve(__dirname, '../dist'),
  src: path.resolve(__dirname, '../js'),
};

module.exports = {
  entry: path.join(paths.src, 'index.js'),

  // NOTE: check https://webpack.js.org/configuration/devtool/
  // and https://github.com/webpack/webpack/tree/master/examples/source-map
  // and https://lorefnon.me/2016/12/03/on-webpack-and-source-map-integration.html
  devtool: 'source-map',

  // NOTE: https://webpack.js.org/configuration/output/#output-filename
  output: {
    path: paths.dist,
    filename: '[chunkhash].bundle.js',
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      js: path.resolve(paths.root, 'js'),
      css: path.resolve(paths.root, 'css'),
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
                'stage-3',
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
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
};
