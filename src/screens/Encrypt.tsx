import React, { useContext, useEffect } from 'react';
import { Divider } from 'antd';
import { useHistory } from 'react-router';
import Add from '../components/Add';
import FileList from '../components/FileList';
import EncryptionContext from '../contexts/Encryption';

const Encrypt: React.FC = () => {
  const history = useHistory();
  const { files } = useContext(EncryptionContext);
  useEffect(() => {
    if (localStorage.getItem('welcome') !== 'seen') {
      history.replace('/welcome');
    }
  }, []);

  return (
    <>
      <Add />
      {Object.keys(files).length > 0 && (
        <>
          <Divider>Files</Divider>
          <FileList />
        </>
      )}
    </>
  );
};

export default Encrypt;
