import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import {  HomeFilled } from '@ant-design/icons';
import { Layout, Button, Space } from 'antd';

import Intro from './screens/Intro';
import Encrypt from './screens/Encrypt';
import Decrypt from './screens/Decrypt';
import SetupKey from './screens/SetupKey';
import Welcome from './screens/Welcome';
import Debug from './screens/Debug';

const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Space>
        <Button
          onClick={() => navigate('/')}
          icon={<HomeFilled />}
        >
          Home
        </Button>
      </Space>
      <Layout.Content style={{ padding: '25px', maxWidth: '800px', width: '100%', margin: 'auto' }}>
        <Routes>
          <Route path="/debug" element={<Debug />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/key" element={<SetupKey />} />
          <Route path="/receive" element={<Decrypt />} />
          <Route path="/send" element={<Encrypt />} />
          <Route path="/" element={<Intro />} />
        </Routes>
      </Layout.Content>
    </>
  );
}

export default AppRouter;
