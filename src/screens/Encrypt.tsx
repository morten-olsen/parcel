import React, { useContext } from 'react';
import Add from '../components/Add';
import FileList from '../components/FileList';
import GithubContext from '../contexts/Github';

const Encrypt: React.FC = () => {
  const { username } = useContext(GithubContext);
  return (
    <div>
      <div>To: {username}</div>
      <Add />
      <FileList />
    </div>
  );
};

export default Encrypt;
