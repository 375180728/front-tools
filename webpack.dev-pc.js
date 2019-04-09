const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const libsExtract = new ExtractTextWebpackPlugin('css/lib.[chunkhash:4].css');
const mainCssExtract = new ExtractTextWebpackPlugin(
  'css/layout.[chunkhash:4].css'
);

module.exports = {
  entry: {
    index: './views/templates/entry/default.jsx'
  },
  output: {
    filename: 'javascripts/[name].[hash:4].js',
    path: path.resolve('dist'),
    publicPath: '/',
    chunkFilename: 'javascripts/[name].[chunkhash:4].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/templates/static-html/default.html',
      chunks: ['vendor', 'index'],
      favicon: './views/i/favicon.ico'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"dev"'
    }),
    mainCssExtract,
    libsExtract,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    hot: true,
    overlay: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ['babel-loader'],
        include: /views/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: mainCssExtract.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: libsExtract.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(jpg|jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/',
              name: '[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'svg/',
              name: '[name].[hash:4].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      pages: path.join(__dirname, 'views/containers/default/pages'),
      component: path.join(__dirname, 'views/components'),
      actions: path.join(__dirname, 'views/actions')
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10
        }
      }
    }
  },
  devtool: 'source-map'
};
