import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';
import { GithubProvider } from './contexts/Github';
import { EncryptionProvider } from './contexts/Encryption';
import AppRouter from './Router';

const App: React.FC = () => (
  <GithubProvider username="morten-olsen">
    <EncryptionProvider>
      <Layout>
        <Layout.Content style={{ padding: '25px' }}>
          <AppRouter/>
        </Layout.Content>
      </Layout>
    </EncryptionProvider>
  </GithubProvider>
);

export default hot(App);
