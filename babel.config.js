const isDevelopment = process.env.NODE_ENV !== 'production';

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
      isDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
};

module.exports = config;
