const config = (api) => {
  api.cache(false);
  return {
    presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [
      [require.resolve('babel-plugin-transform-inline-environment-variables'), {
        include: [
          'GITHUB_REPOSITORY',
        ],
      }],
      [require.resolve('react-hot-loader/babel')],
    ],
  };
};

module.exports = config;
