import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Example from './views/Example/Example';
import LandingPage from './views/LandingPage/LandingPage';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/example">
          <Example />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
