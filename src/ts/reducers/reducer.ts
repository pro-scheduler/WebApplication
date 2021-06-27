import { combineReducers } from 'redux';
import userReducer from './userReducer';
import meetingReducer from './meetingReducer';
import surveyReducer from './surveyReducer';
import invitationReducer from './invitationReducer';

const rootReducer = combineReducers({
  userReducer,
  meetings: meetingReducer,
  surveyReducer,
  invitationReducer,
});

export default rootReducer;
