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
import { UserDetails } from './model/user/ProUser';
import Declarations from './views/Declarations/Declarations';
import UserProfile from './views/UserProfile/UserProfile';
import Surveys from './views/Surveys/Surveys';
import HomePage from './views/HomePage/HomePage';
import MeetingInvitation from './views/MeetingInvitation/MeetingInvitation';
import useWindowDimensions from './components/common/window/WindowDimension';

const Routes = () => {
  const [user, setUser] = useState<UserDetails>(defaultUser);
  const [response, setResponse] = useState<any>({ isFailed: false });
  // eslint-disable-next-line
  const { width, height } = useWindowDimensions();
  const marginLeft: number = 80;

  const refreshUser = () => {
    fetchCurrentUser(setUser, setResponse);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const generateNavbar = () => <Navbar user={user} width={width} />;

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
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <CreateMeeting />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/meetings/:id" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <MeetingDetails user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/meetings" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <Meetings user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/invitations" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <Invitations user={user} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/declarations" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <Declarations />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/surveys" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <Surveys />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/profile" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <UserProfile user={user} refreshUser={refreshUser} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/home" isNotLoggedIn={response.isFailed}>
          {generateNavbar()}
          <div style={{ marginLeft: width > 500 ? marginLeft : 0 }}>
            <HomePage user={user} />
          </div>
        </ProtectedRoute>
        <Route path="/join/:generatedEndpoint">
          <MeetingInvitation />
        </Route>
        <Route path="/">
          <LandingPage user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
