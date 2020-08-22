import React, { useEffect } from 'react';
import { Space, Layout, Button, Typography, notification } from 'antd';
import { AlignLeftOutlined, EyeInvisibleTwoTone, ArrowRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const openNotification = () => {
  notification.warn({
    message: 'Slow down!',
    description: 'I am still working on this, but thanks for the interrest.'
  });
};

const Welcome: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    localStorage.setItem('welcome', 'seen');
  });

  return (
    <Layout style={{ maxWidth: 800, margin: 'auto', textAlign: 'center' }}>
      <Space direction="vertical">
        <EyeInvisibleTwoTone style={{ fontSize: 200 }} />
        <Typography.Title level={1}>Protect before sending</Typography.Title>
        <p>
          The internet can seem like a scary place, especially if you want to send sensitiv information across it.
        </p>
        <p>
          The truth is that a lot of systems, including e-mails, was not build for the internet that we have today.
        </p>
        <p>
          This is why it is so important to make sure your documents are well protected before sharing.
        </p>
        <p>
          This tool can be used to protect information before sharing them with me. The documents will be encrypted so that only I can ever unlock them, so no snoppy man in the middle...
        </p>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={() => history.push('/')}
        >
          Start protecting!
        </Button>
        <Button
          icon={<AlignLeftOutlined />}
          onClick={openNotification}
        >
          Read all the technical stuff
        </Button>
      </Space>
    </Layout>
  );
};

export default Welcome;
