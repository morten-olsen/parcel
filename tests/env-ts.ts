import NodeEnvironment from 'jest-environment-node';
import { Server, createServer } from 'http';
import getPort from 'get-port';
import webpack from 'webpack';
import path from 'path';
import express from 'express';
import createConfig from '../webpack.config';

const build = () => new Promise<Server>(async (resolve, reject) => {
  const config = await createConfig({
    test: true,
  });
  const port = await getPort();
  const bundler = webpack(config);
  bundler.run((err, stats) => {
    if (err) {
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
  private _server?: Server;

  constructor(config: any) {
    super(config);
  }

  async setup() {
    await super.setup();
    this._server = await build();
    const address: any = this._server?.address();
    this.global.testUrl = `http://${address.address}:${address.port}`
  }

  async teardown() {
    await super.teardown();
    this._server?.close();
  }
}

module.exports = CustomEnvironment;
