import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import SignIn from './views/Auth/SignIn';
import CreateMeeting from './views/CreateMeeting/CreateMeeting';
import Example from './views/Example/Example';
import LandingPage from './views/LandingPage/LandingPage';
import Meetings from './views/Meetings/Meetings';
import MeetingDetails from './views/MeetingDetails/MeetingDetails';
import Time from './views/Time/Time';
import ExampleInvalid from './views/Example/ExampleInvalid';
import ExampleValidation from './views/Example/ExampleValidation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Invitations from './views/Invitations/Invitations';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchCurrentUser } from './API/user/userService';

const Routes = () => {
  const [response, setResponse] = useState<any>({ isFailed: false });
  useEffect(() => {
    fetchCurrentUser(() => {}, setResponse);
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <ProtectedRoute path="/example" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <Example />
        </ProtectedRoute>
        <ProtectedRoute path="/invalid" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <ExampleInvalid />
        </ProtectedRoute>
        <ProtectedRoute path="/validation" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <ExampleValidation />
        </ProtectedRoute>
        <Route path="/signin">
          <SignIn />
        </Route>
        <ProtectedRoute path="/create" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <CreateMeeting />
        </ProtectedRoute>
        <ProtectedRoute path="/meetings/:id" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <MeetingDetails />
        </ProtectedRoute>
        <ProtectedRoute path="/meetings" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <Meetings />
        </ProtectedRoute>
        <ProtectedRoute path="/invitations" isNotLoggedIn={response.isFailed}>
          <Navbar />
          <Invitations />
        </ProtectedRoute>
        <ProtectedRoute path="/time" isNotLoggedIn={response.isFailed}>
          <Time />
        </ProtectedRoute>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
