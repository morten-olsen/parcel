import React, { useContext } from 'react';
import { Divider, Button } from 'antd';
import FileList from '../components/FileList';
import Add from '../components/decrypt/AddFile';
import DecryptionContext from '../contexts/Decryption';

const Decrypt: React.FC = () => {
  const { files, deleteFile } = useContext(DecryptionContext);

  return (
    <>
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
