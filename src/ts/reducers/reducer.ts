import { combineReducers } from 'redux';
import userReducer from './userReducer';
import meetingReducer from './meetingReducer';
import messagesReducer from './messagesReducer';
import surveyReducer from './surveyReducer';
import invitationReducer from './invitationReducer';

const rootReducer = combineReducers({
  userReducer,
  meetings: meetingReducer,
  messages: messagesReducer,
  surveyReducer,
  invitationReducer,
});

export default rootReducer;
