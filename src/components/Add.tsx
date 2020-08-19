import React, { Fragment, useState } from 'react';
import { Menu, Dropdown, Form } from 'antd';
import { DownOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons';
import AddText from './AddText';
import AddFile from './AddFile';

const layout = {
  labelCol: { span: 2 },
};

const Add: React.FC = () => {
  const [type, setType] = useState<'file' | 'text'>('text');

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => setType('file')}
        active={type === 'file'}
        icon={<FileOutlined />}
      >
        File
      </Menu.Item>
      <Menu.Item
        onClick={() => setType('text')}
        active={type === 'text'}
        icon={<FileTextOutlined />}
      >
        Text
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Form {...layout}>
        <Form.Item
          label="I want to encrypt a"
        >
          <Dropdown overlay={menu}>
            <a>{type} <DownOutlined /></a>
          </Dropdown>
      </Form.Item>
      </Form>
      {type === 'text' && <AddText />}
      {type === 'file' && <AddFile />}
    </>
  );
};

export default Add;
