import React, { useContext, useState, useCallback } from 'react';
import { Popconfirm, Space, Typography, Input, Button, Form } from 'antd';
import DecryptionContext from '../contexts/Decryption';
import { downloadLink } from '../helpers/files';
import {
  RocketTwoTone,
  LockTwoTone,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';

const SetupKey: React.FC = () => {
  const {
    createKey,
    deleteKey,
    publicKey,
  } = useContext(DecryptionContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const downloadPublicKey = useCallback(() => {
    const publicKeyBlob = new Blob([publicKey + ''], {
      type: 'text/text',
    });
    downloadLink('public-key.asc', publicKeyBlob);
  }, [publicKey]);

  const setupKey = useCallback(() => {
    createKey(name, email);
  }, [name, email]);

  if (!publicKey) {
    return (
      <>
        <Space direction="vertical" style={{ textAlign: 'center' }} >
          <LockTwoTone style={{ fontSize: 150 }} />
          <Typography.Title>Create your sharing key</Typography.Title>
          <p>
            Before I can send protected information to you I need a "sharing" key, which is a key that gets stored this device, allowing this device (and this device only) to read the informations I am sending.
          </p>
          <p>
            After creating it you need to send it to me
          </p>
        </Space>
        <Form>
          <Form.Item>
            <Input
              placeholder="Your name"
              size="large"
              prefix={<UserOutlined />}
              value={name}
              onChange={evt => setName(evt.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Your e-mail"
              size="large"
              prefix={<MailOutlined />}
              value={email}
              onChange={evt => setEmail(evt.target.value)}
              />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }} >
            <Button
              disabled={!name || !email}
              type="primary"
              onClick={setupKey}
              size="large"
              shape="round"
            >
              Create sharing key
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <RocketTwoTone style={{ fontSize: 150 }} />
        <Typography.Title>Okay, you are all set.</Typography.Title>
        <p>
          Just send me your sharing key, and I will send files using it.
        </p>
        <p>
          Remember that you need to go to this website on this device to decrypt the files after receiving them
        </p>
        <Space direction="vertical" size="large"> 
          <Button
            onClick={downloadPublicKey}
            type="primary"
            size="large"
            shape="round"
          >
            Download sharing key
          </Button>
          <Popconfirm
          title="Are you sure?"
            onConfirm={deleteKey}
          >
            <Button
              danger
              size="small"
              type="link"
            >
              Delete sharing key
            </Button>
          </Popconfirm>
        </Space>
      </div>
    );
  }
};

export default SetupKey;
