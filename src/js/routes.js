import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Example from './views/Example/Example';
import LandingPage from './views/LandingPage/LandingPage';

const Routes = () => {
    return (
      <Switch>
        <Route path="/example">
          <Example />
        </Route>

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    );
  };
  
  export default Routes;
