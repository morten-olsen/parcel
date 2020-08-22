import React, { createContext } from 'react';

const data = require('../../data.json');
console.log('d', data);

interface GithubContextType {
  username: string;
  keys?: string[];
}

const GithubContext = createContext<GithubContextType>(data);
const GithubProvider: React.FC = ({
  children,
}) => (
  <GithubContext.Provider
    value={{ data }}
  >
    {children}
  </GithubContext.Provider>
);

export {
  GithubProvider,
};

export default GithubContext;
