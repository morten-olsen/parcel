import React, { useContext } from 'react';
import { Divider } from 'antd';
import Add from '../components/encrypt/Add';
import FileList from '../components/FileList';
import EncryptionContext from '../contexts/Encryption';

const Encrypt: React.FC = () => {
  const { files, deleteFile } = useContext(EncryptionContext);

  return (
    <>
      <Add />
      {Object.keys(files).length > 0 && (
        <>
          <Divider>Files</Divider>
          <FileList files={files} deleteFile={deleteFile} />
          <Divider />
          <i
            style={{
              textAlign: 'center',
              paddingTop: '10px',
              display: 'block',
              fontSize: 12,
            }}
          >
            Note: files are not send to me, you still have to download the
            encrypted files and send it to me.
          </i>
        </>
      )}
    </>
  );
};

export default Encrypt;
