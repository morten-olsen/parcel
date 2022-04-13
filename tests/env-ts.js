const NodeEnvironment = require('jest-environment-node');
const { Server, createServer } = require('http');
const getPort = require('get-port');
const webpack = require('webpack');
const path = require('path');
const express = require('express');
const { default: createConfig } = require('../webpack.config');

const build = () => new Promise(async (resolve, reject) => {
  const config = await createConfig({
    test: true,
  });
  const port = await getPort();
  const bundler = webpack(config);
  bundler.run((err, stats) => {
    if (err || !stats) {
      return reject(err);
    } else if (stats.hasErrors()) {
      return reject(new Error('Webpack errors'));
    }
    const app = express();
    app.use(express.static(path.join(__dirname, '..', 'dist')));
    const server = createServer(app);
    const listener = server.listen(port, '127.0.0.1', () => {
      resolve(listener);
    });
  });
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this._server = await build();
    const address = this._server.address();
    this.global.testUrl = `http://${address.address}:${address.port}`
  }

  async teardown() {
    await super.teardown();
    if (!this._server) {
      return;
    }
    this._server.close();
  }
}

module.exports = CustomEnvironment;
