import React, { useState, useCallback, useContext } from 'react';
import { Input, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EncryptionContext from '../../contexts/Encryption';

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
    <Form>
      <Form.Item>
        <Input
          placeholder="Title"
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input.TextArea
          placeholder="Your message here..."
          value={text} 
          rows={6}
          onChange={evt => setText(evt.target.value)} 
        />
      </Form.Item>
      <Form.Item>
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

