import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import meetingReducer from './meetingReducer';

const rootReducer = combineReducers({
  userReducer,
  counterReducer,
  meetingReducer,
});

export default rootReducer;
