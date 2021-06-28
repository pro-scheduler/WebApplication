import { Dispatch } from 'redux';

const setMeetingIdInInvitations = (meetingId: number) => (dispatch: Dispatch) => {
  return dispatch({ type: 'SET_MEETING_ID', payload: { meetingId } });
};

const actions = {
  setMeetingIdInInvitations,
};

export default actions;
