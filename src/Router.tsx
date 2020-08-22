import React from 'react';
import {
  Switch,
  Route,
  useHistory,
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
  const history = useHistory();
  return (
    <>
      <Space>
        <Button
          onClick={() => history.push('/')}
          icon={<HomeFilled />}
        >
          Home
        </Button>
      </Space>
      <Layout.Content style={{ padding: '25px', maxWidth: '800px', width: '100%', margin: 'auto' }}>
        <Switch>
          <Route path="/debug">
            <Debug />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/key">
            <SetupKey />
          </Route>
          <Route path="/receive">
            <Decrypt />
          </Route>
          <Route path="/send">
            <Encrypt />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </Layout.Content>
    </>
  );
}

export default AppRouter;
