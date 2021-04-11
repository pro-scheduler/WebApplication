import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import meetingReducer from './meetingReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  userReducer,
  counterReducer,
  meetings: meetingReducer,
  messages: messagesReducer,
});

export default rootReducer;
