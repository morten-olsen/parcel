import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SriPlugin from 'webpack-subresource-integrity';
import path from 'path';

const OfflinePlugin = require('offline-plugin');

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
  optimization: {
    usedExports: true,
  },
  plugins: [
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: !__DEV__,
    }),
    new HtmlWebpackPlugin({
      title: 'Parcel',
      minify: true,
      template: path.join(__dirname, 'html.html'),
    }),
    new OfflinePlugin({
      events: true,
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
