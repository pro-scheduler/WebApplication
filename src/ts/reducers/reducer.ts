import { combineReducers } from 'redux';
import userReducer from './userReducer';
import meetingReducer from './meetingReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  userReducer,
  meetings: meetingReducer,
  messages: messagesReducer,
});

export default rootReducer;
