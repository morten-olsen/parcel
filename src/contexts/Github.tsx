import React, { createContext } from 'react';

const data = require('../../data.json');

interface GithubContextType {
  username: string;
  keys?: string[];
}

const GithubContext = createContext<GithubContextType>(data);
const GithubProvider = GithubContext.Provider;

export {
  GithubProvider,
};

export default GithubContext;
