import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
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
  const { width } = useWindowDimensions();
  const marginLeft: number = 80;
  const [invitationsCount, setInvitationsCount] = useState<number>(0);
  const [surveyCount, setSurveyCount] = useState<number>(0);

  const refreshUser = () => {
    fetchCurrentUser(setUser, setResponse);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const generateNavbar = () => (
    <Navbar
      user={user}
      width={width}
      invitationCount={invitationsCount}
      surveyCount={surveyCount}
    />
  );

  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
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
            <HomePage
              user={user}
              setInvitationsCount={setInvitationsCount}
              setSurveyCount={setSurveyCount}
            />
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
