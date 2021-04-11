require('dotenv').config();
import webpack, { Configuration } from 'webpack';
import axios from 'axios';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import path from 'path';

interface Options {
  test: boolean;
}

const repo = process.env.GITHUB_REPOSITORY;
if (!repo) {
  throw new Error('No GITHUB_REPOSITRY env variable found');
}
const [username] = repo.split('/');

const __DEV__ = process.env.NODE_ENV !== 'production';

const getData = async () => {
  const { data: keyList } = await axios.get(`https://api.github.com/users/${username}/gpg_keys`);
  if (keyList.length === 0) {
    throw new Error(`The user ${username} does not have any GPG keys`);
  }
  const data = {
    username,
    keys: keyList.map((key: any) => key.raw_key),
  };

  return data;
};

const getTestData: typeof getData = async () => {
  const pubKey = fs.readFileSync(path.join(__dirname, 'test-assets', 'key.pub'), 'utf-8');
  return {
    username: 'foobar',
    keys: [
      pubKey,
    ],
  };
};

const createConfig = async (options: Options = {
  test: false,
}):Promise<Configuration> => {
  const data = await (options.test ? getTestData() : getData());
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
        data: JSON.stringify(data),
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

  return config;
};

export default createConfig;
