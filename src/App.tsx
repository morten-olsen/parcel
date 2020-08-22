import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';
import { GithubProvider } from './contexts/Github';
import { EncryptionProvider } from './contexts/Encryption';
import { DecryptionProvider } from './contexts/Decryption';
import AppRouter from './Router';

const App: React.FC = () => (
  <GithubProvider>
    <EncryptionProvider>
      <DecryptionProvider>
        <Layout style={{minHeight:"100vh"}}>
          <Layout.Content style={{ padding: '25px', maxWidth: '800px', width: '100%', margin: 'auto' }}>
            <AppRouter/>
          </Layout.Content>
        </Layout>
      </DecryptionProvider>
    </EncryptionProvider>
  </GithubProvider>
);

export default hot(App);
