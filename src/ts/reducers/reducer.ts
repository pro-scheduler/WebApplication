import { combineReducers } from 'redux';
import userReducer from './userReducer';
import surveyReducer from './surveyReducer';

const rootReducer = combineReducers({
  userReducer,
  surveyReducer,
});

export default rootReducer;
