import Meeting from '../model/Meeting';
import { Dispatch } from 'redux';

const fetchAllMeetings = () => (dispatch: Dispatch) => {
  fetch('http://localhost:8080/api/meetings')
    .then((response) => response.json())
    .then(
      (meetings) => {
        console.log(meetings);
        return dispatch({ type: 'LOAD_ALL', payload: meetings });
      }
      //   (error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
    );
};

const loadMeeting = (id: number) => {
  return {
    type: 'LOAD_ONE',
    payload: id,
  };
};

const addMeeting = (meeting: Meeting) => {
  return {
    type: 'ADD_MEETING',
    payload: meeting,
  };
};

const deleteMeeting = (id: number) => {
  return {
    type: 'DELETE_MEETING',
    payload: id,
  };
};

const updateMeeting = (meeting: Meeting) => {
  return {
    type: 'UPDATE_MEETING',
    payload: meeting,
  };
};

const actions = {
  addMeeting,
  deleteMeeting,
  updateMeeting,
  fetchAllMeetings,
  loadMeeting,
};

export default actions;
