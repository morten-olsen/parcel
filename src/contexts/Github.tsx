import React, { useState, useEffect, createContext } from 'react';
import { Layout, Spin } from 'antd';

interface GithubContextType {
  username: string;
  user?: any;
  keys?: string[];
  error?: any;
  state: 'loading' | 'ready' | 'failed'
}

interface Props {
  username: string;
  children: React.ReactNode;
}

const Loader = () => (
  <Layout
    style={{
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <Spin size="large" />
  </Layout>
);

const GithubContext = createContext<GithubContextType>({
  username: 'unknown',
  state: 'failed',
});

const GithubProvider: React.FC<Props> = ({
  username,
  children,
}) => {
  const [keys, setKeys] = useState<GithubContextType['keys'] | undefined>();
  const [state, setState] = useState<GithubContextType['state']>('loading');
  const [error, setError] = useState<GithubContextType['state'] | undefined>();
  const [user, setUser] = useState<GithubContextType['user'] | undefined>();

  useEffect(() => {
    const run = async () => {
      try {
        const keysRes = await fetch(`https://api.github.com/users/${username}/gpg_keys`);
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const keys = await keysRes.json();
        const user = await userRes.json();
        setState('ready');
        setKeys(keys.map((key: any) => key.raw_key));
        setUser(user);
      } catch (err) {
        setState('failed');
        setError(err);
      }
    };

    run();
  }, [username]);

  if (state === 'loading') {
    return <Loader />;
  }

  return (
    <GithubContext.Provider
      value={{
        username,
        user,
        keys,
        state,
        error,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export {
  GithubProvider,
};

export default GithubContext;
