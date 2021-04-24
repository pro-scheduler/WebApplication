import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignIn from './views/Auth/Login/SignIn';
import SignUp from './views/Auth/Register/Signup';
import CreateMeeting from './views/CreateMeeting/CreateMeeting';
import Example from './views/Example/Example';
import LandingPage from './views/LandingPage/LandingPage';
import Meetings from './views/Meetings/Meetings';
import MeetingDetails from './views/MeetingDetails/MeetingDetails';
import Test from './views/Test/Test';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/example">
          <Navbar />
          <Example />
        </Route>
        <Route path="/signin">
          <Navbar showDetails={false} />
          <SignIn />
        </Route>
        <Route path="/signup">
          <Navbar showDetails={false} />
          <SignUp />
        </Route>
        <Route path="/create">
          <Navbar />
          <CreateMeeting />
        </Route>
        <Route path="/meetings/:id">
          <Navbar />
          <MeetingDetails />
        </Route>
        <Route path="/meetings">
          <Navbar />
          <Meetings />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
