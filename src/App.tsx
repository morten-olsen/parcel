import React from 'react';
import { Layout } from 'antd';
import { HashRouter as Router } from 'react-router-dom';
import { GithubProvider } from './contexts/Github';
import { EncryptionProvider } from './contexts/Encryption';
import { DecryptionProvider } from './contexts/Decryption';
import AppRouter from './Router';

const App: React.FC = () => {
  return (
    <GithubProvider>
      <EncryptionProvider>
        <DecryptionProvider>
          <Layout style={{ minHeight: '100vh' }}>
            <Router>
              <AppRouter />
            </Router>
          </Layout>
        </DecryptionProvider>
      </EncryptionProvider>
    </GithubProvider>
  );
};

export default App;
