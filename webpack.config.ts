import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const config: Configuration = {
  mode: 'development',
  entry: {
    app: [
      path.join(__dirname, 'src', 'index.tsx'),
    ],
  },
  output: {
    path: path.join(__dirname, 'docs'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [{
      test: /\.tsx?/,
      use: ['babel-loader'],
    }],
  },
};

export default config;
