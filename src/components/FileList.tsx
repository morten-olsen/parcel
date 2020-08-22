import React, { useContext } from 'react';
import { Space, List, Empty, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import EncryptionContext from '../contexts/Encryption';
import useDownloadAll from '../hooks/useDownloadAll';
import File from './File';

const Encrypt: React.FC = () => {
  const { files, deleteFile } = useContext(EncryptionContext);
  const { status, downloadAll } = useDownloadAll();

  if (Object.keys(files).length === 0) {
    return <Empty />
  }

  return (
    <Space direction="vertical" style={{width: '100%' }}>
      <List>
        {Object.entries(files).map(([id, file]) => (
          <File
            key={id}
            file={file}
            remove={() => deleteFile(id)}
          />
        ))}
      </List>
      {downloadAll && (
        <Button
          icon={<DownloadOutlined />}
          disabled={status !== 'ready'}
          onClick={downloadAll}
        >
          Download all
        </Button>
      )}
    </Space>
  );
};

export default Encrypt;
