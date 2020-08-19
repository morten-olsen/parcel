import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Encrypt from './screens/Encrypt';
import Debug from './screens/Debug';

const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/debug">
        <Debug />
      </Route>
      <Route path="/">
        <Encrypt />
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
