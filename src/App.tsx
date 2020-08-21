import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';
import { GithubProvider } from './contexts/Github';
import { EncryptionProvider } from './contexts/Encryption';
import AppRouter from './Router';

const App: React.FC = () => (
  <GithubProvider username="morten-olsen">
    <EncryptionProvider>
      <Layout style={{minHeight:"100vh"}}>
        <Layout.Content style={{ padding: '25px', maxWidth: '800px', width: '100%', margin: 'auto' }}>
          <AppRouter/>
        </Layout.Content>
      </Layout>
    </EncryptionProvider>
  </GithubProvider>
);

export default hot(App);
