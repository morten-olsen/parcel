import React, { useContext } from 'react';
import { List, Empty } from 'antd';
import EncryptionContext from '../contexts/Encryption';
import File from './File';

const Encrypt: React.FC = () => {
  const { files, deleteFile } = useContext(EncryptionContext);

  if (Object.keys(files).length === 0) {
    return <Empty />
  }

  return (
    <List>
      {Object.entries(files).map(([id, file]) => (
        <File
          key={id}
          file={file}
          remove={() => deleteFile(id)}
        />
      ))}
    </List>
  );
};

export default Encrypt;
