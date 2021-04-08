import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignIn from './views/Auth/SignIn';

import Example from './views/Example/Example';
import LandingPage from './views/LandingPage/LandingPage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/example">
          <Navbar />
          <Example />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
