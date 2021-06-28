import { combineReducers } from 'redux';
import userReducer from './userReducer';
import surveyReducer from './surveyReducer';
import invitationReducer from './invitationReducer';

const rootReducer = combineReducers({
  userReducer,
  surveyReducer,
  invitationReducer,
});

export default rootReducer;
