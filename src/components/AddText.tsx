import React, { useState, useCallback, useContext } from 'react';
import { Input, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EncryptionContext from '../contexts/Encryption';

const layout = {
  labelCol: { span: 2 },
};

const tailLayout = {
  wrapperCol: { offset: 2 },
};

const AddText : React.FC = () => {
  const { addText } = useContext(EncryptionContext);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const add = useCallback(() => {
    addText(text, name || 'untitled');
    setText('');
    setName('');
  }, [text, addText]);

  return (
    <Form {...layout}>
      <Form.Item
        label="Name"
      >
        <Input
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Message"
      >
        <Input.TextArea
          value={text} 
          rows={10}
          onChange={evt => setText(evt.target.value)} 
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          onClick={add}
          type="primary"
          icon={<PlusOutlined />}
          disabled={!text}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddText;

