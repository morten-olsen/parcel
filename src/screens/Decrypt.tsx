import React, { useContext, useEffect, useCallback } from 'react';
import { Divider, Button } from 'antd';
import { useHistory } from 'react-router';
import FileList from '../components/FileList';
import Add from '../components/decrypt/AddFile';
import DecryptionContext from '../contexts/Decryption';
import { downloadLink } from '../helpers/files';

const Decrypt: React.FC = () => {
  const history = useHistory();
  const { publicKey, files, deleteFile } = useContext(DecryptionContext);
  useEffect(() => {
    if (localStorage.getItem('welcome') !== 'seen') {
      history.replace('/welcome');
    }
  }, []);

  const downloadPublicKey = useCallback(() => {
    const publicKeyBlob = new Blob([publicKey!]);
    downloadLink('public-key.asc', publicKeyBlob);
  }, []);

  return (
    <>
      <Button
        onClick={downloadPublicKey}
      >
        Download you sharing key
      </Button>
      <Add />
      {Object.keys(files).length > 0 && (
        <>
          <Divider>Files</Divider>
          <FileList
            files={files}
            deleteFile={deleteFile}
          />
        </>
      )}
    </>
  );
};

export default Decrypt;
