import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import SignIn from './views/Auth/SignIn';
import CreateMeeting from './views/CreateMeeting/CreateMeeting';
import LandingPage from './views/LandingPage/LandingPage';
import Meetings from './views/Meetings/Meetings';
import MeetingDetails from './views/MeetingDetails/MeetingDetails';
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
  const marginLeft: number = 80;

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
        <Route path="/signin">
          <SignIn />
        </Route>
        <ProtectedRoute path="/create" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
            <CreateMeeting />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/meetings/:id" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
            <MeetingDetails user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/meetings" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
            <Meetings user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/invitations" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
            <Invitations user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/declarations" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
            <Declarations />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/surveys" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
            <Surveys />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/profile" isNotLoggedIn={response.isFailed}>
          <Navbar user={user} />
          <div style={{ marginLeft: marginLeft }}>
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
