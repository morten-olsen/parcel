import React, { useState, useEffect, createContext } from 'react';

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
