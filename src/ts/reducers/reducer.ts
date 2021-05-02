import { combineReducers } from 'redux';
import userReducer from './userReducer';
import meetingReducer from './meetingReducer';
import messagesReducer from './messagesReducer';
import surveyReducer from './surveyReducer';

const rootReducer = combineReducers({
  userReducer,
  meetings: meetingReducer,
  messages: messagesReducer,
  surveyReducer,
});

export default rootReducer;
