import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import path from 'path';

const data = require('./data.json');

const __DEV__ = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    app: [
      ...(__DEV__ ? ['react-hot-loader/patch'] : []),
      path.join(__dirname, 'src', 'index.tsx'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
    }),
    new HtmlWebpackPlugin({
      title: `Parcel for ${data.username}`,
      minify: true,
      template: path.join(__dirname, 'html.html'),
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
};

(config as any).devServer = {
  hot: true,
  contentBase: './dist',
};

export default config;
