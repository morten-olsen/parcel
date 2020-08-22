import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Intro from './screens/Intro';
import Encrypt from './screens/Encrypt';
import Decrypt from './screens/Decrypt';
import SetupKey from './screens/SetupKey';
import Welcome from './screens/Welcome';
import Debug from './screens/Debug';

const AppRouter: React.FC = () => (
  <Router>
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
  </Router>
);

export default AppRouter;
