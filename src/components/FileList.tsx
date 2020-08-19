import React, { useContext } from 'react';
import EncryptionContext from '../contexts/Encryption';
import File from './File';

const Encrypt: React.FC = () => {
  const { files, deleteFile } = useContext(EncryptionContext);

  return (
    <div>
      {Object.entries(files).map(([id, file]) => (
        <File
          key={id}
          file={file}
          remove={() => deleteFile(id)}
        />
      ))}
    </div>
  );
};

export default Encrypt;
