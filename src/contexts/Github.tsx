import React, { createContext, ReactNode } from 'react';

declare var data: any;

interface GithubContextType {
  username: string;
  keys?: string[];
}

type GithubProviderProps = {
  children: ReactNode;
};

const GithubContext = createContext<GithubContextType>(data);
const GithubProvider: React.FC<GithubProviderProps> = ({ children }) => (
  <GithubContext.Provider value={{ ...data }}>
    {children}
  </GithubContext.Provider>
);

export { GithubProvider };

export default GithubContext;
