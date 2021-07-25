import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const Routes = () => {
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
        <Route path="/example">
          <Navbar />
          <Example />
        </Route>
        <Route path="/invalid">
          <Navbar />
          <ExampleInvalid />
        </Route>
        <Route path="/validation">
          <Navbar />
          <ExampleValidation />
        </Route>
        <Route path="/signin">
          <SignIn />
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
        <Route path="/invitations">
          <Navbar />
          <Invitations />
        </Route>
        <Route path="/time">
          <Time />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
