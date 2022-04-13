import React from 'react';
import { Space, Layout, Typography } from 'antd';
import { EyeInvisibleTwoTone } from '@ant-design/icons';

const Welcome: React.FC = () => {
  return (
    <Layout style={{ maxWidth: 800, margin: 'auto', textAlign: 'center' }}>
      <Space direction="vertical">
        <EyeInvisibleTwoTone style={{ fontSize: 200 }} />
        <Typography.Title level={1}>Protect before sending</Typography.Title>
        <p>The internet can seem like a scary place...</p>
        <p>
          Especially because a lot of the tools we use everyday (such as e-mail)
          wasn't build for the internet that we have today. This is why it is
          important to have an additional layer of security when sending
          sensitive information.
        </p>
        <p>
          This is a tool that will help you have that extra layer of security
          when sharing files with me.
        </p>
      </Space>
    </Layout>
  );
};

export default Welcome;
