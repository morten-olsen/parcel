import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GithubProvider } from './contexts/Github';
import { EncryptionProvider } from './contexts/Encryption';
import Encrypt from './screens/Encrypt';
import theme from './theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GithubProvider username="morten-olsen">
      <div>Test</div>
      <EncryptionProvider>
        <Encrypt />
      </EncryptionProvider>
    </GithubProvider>
  </ThemeProvider>
);

export default App;
