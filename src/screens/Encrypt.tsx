import React, { useContext } from 'react';
import { Collapse, Badge } from 'antd';
import Profile from '../components/Profile';
import Add from '../components/Add';
import FileList from '../components/FileList';
import EncryptionContext from '../contexts/Encryption';

const Encrypt: React.FC = () => {
  const { files } = useContext(EncryptionContext);
  return (
    <>
      <Collapse ghost defaultActiveKey={[2, 3]}>
        <Collapse.Panel key={2} header="Encrypt">
          <Add />
        </Collapse.Panel>
        <Collapse.Panel
          key={3}
          header={(
            <Badge count={Object.keys(files).length} offset={[20, 7]}>
              Files
            </Badge>
          )}
        >
          <FileList />
        </Collapse.Panel>
        <Collapse.Panel key={1} header="Profile">
          <Profile />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

export default Encrypt;
