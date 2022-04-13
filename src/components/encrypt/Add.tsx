import React, { useState } from 'react';
import { Radio, Divider } from 'antd';
import { FileOutlined, FileTextOutlined } from '@ant-design/icons';
import AddText from './AddText';
import AddFile from './AddFile';

const DEFAULT_VALUE = 'file';

const Add: React.FC = () => {
  const [type, setType] = useState<'file' | 'text'>(DEFAULT_VALUE);

  return (
    <>
      <Divider>
        <Radio.Group
          onChange={(evt) => setType(evt.target.value)}
          defaultValue={DEFAULT_VALUE}
        >
          <Radio.Button className="add-text-tab" value="text">
            <FileTextOutlined /> Text
          </Radio.Button>
          <Radio.Button className="add-file-tab" value="file">
            <FileOutlined /> File
          </Radio.Button>
        </Radio.Group>
      </Divider>
      {type === 'text' && <AddText />}
      {type === 'file' && <AddFile />}
    </>
  );
};

export default Add;
