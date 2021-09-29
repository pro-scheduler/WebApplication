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
import { defaultUser } from './auth/userContext';
import { UserSummary } from './model/user/ProUser';
import Declarations from './views/Declarations/Declarations';
import UserProfile from './views/UserProfile/UserProfile';
import Surveys from './views/Surveys/Surveys';

const Routes = () => {
  const [user, setUser] = useState<UserSummary>(defaultUser);
  const [response, setResponse] = useState<any>({ isFailed: false });

  const refreshUser = () => {
    fetchCurrentUser(setUser, setResponse);
  };

  useEffect(() => {
    refreshUser();
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
          <Navbar user={user} />
          <Example />
        </ProtectedRoute>
        <ProtectedRoute path="/invalid" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <ExampleInvalid />
        </ProtectedRoute>
        <ProtectedRoute path="/validation" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <ExampleValidation />
        </ProtectedRoute>
        <Route path="/signin">
          <SignIn />
        </Route>
        <ProtectedRoute path="/create" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <CreateMeeting />
        </ProtectedRoute>
        <ProtectedRoute path="/meetings/:id" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <MeetingDetails user={user} />
        </ProtectedRoute>
        <ProtectedRoute path="/meetings" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: 80 }}>
            <Meetings user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/invitations" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: 80 }}>
            <Invitations user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/time" isNotLoggedIn={response.isFailed}>
          <Time />
        </ProtectedRoute>
        <ProtectedRoute path="/declarations" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: 80 }}>
            <Declarations />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/surveys" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: 80 }}>
            <Surveys />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/profile" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: 80 }}>
            <UserProfile user={user} refreshUser={refreshUser} />
          </div>
        </ProtectedRoute>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
