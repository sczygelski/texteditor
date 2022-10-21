const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource' 
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'webpack plugin'
      }),
      new InjectManifest({
        swSrc: './src/src-sw.js',
        swDest: './dist/serviceworker.js'
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        start_url: '.',
        publicPath: './',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96],
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ]
  };
};