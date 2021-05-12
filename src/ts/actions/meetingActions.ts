import { Dispatch } from 'redux';
import { createMeetingSuccess, createMeetingFailed, createMeetingReset } from './messagesActions';
import { getMeetingsUrl, getMeetingUrl, getRemoveUserFromMeetingUrl } from '../API/meeting/urls';
import { DeepMeetingDetailsDTO, Meeting, MeetingDTO } from '../model/meeting/Meeting';
import { mapMeetingsDTOToMeetings } from '../model/meeting/MeetingMapper';

const fetchAllMeetings = () => (dispatch: Dispatch) => {
  fetch(getMeetingsUrl())
    .then((response) => response.json())
    .then((meetingsDTO: MeetingDTO[]) => {
      return dispatch({ type: 'LOAD_ALL', payload: mapMeetingsDTOToMeetings(meetingsDTO) });
    });
};

const saveMeeting = (meeting: Meeting) => (dispatch: Dispatch) => {
  dispatch(createMeetingReset());

  fetch(getMeetingsUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meeting),
  }).then((response) => {
    if (response.status === 201) {
      return dispatch(createMeetingSuccess('Meeting has been created successfully :)'));
    } else {
      return dispatch(createMeetingFailed('Meeting has not been created ;/'));
    }
  });
};

const loadMeeting = (id: number) => (dispatch: Dispatch) => {
  fetch(getMeetingUrl(id))
    .then((response: Response) => response.json())
    .then((deepMeetingDetailsDTO: DeepMeetingDetailsDTO) => {
      return dispatch({ type: 'LOAD_ONE', payload: deepMeetingDetailsDTO });
    });
};

const removeUserFromMeeting = (meetingId: number, userId: number) => {
  fetch(getRemoveUserFromMeetingUrl(meetingId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
    }),
  }).then((response) => {
    console.log(response);
  });
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
  deleteMeeting,
  updateMeeting,
  fetchAllMeetings,
  loadMeeting,
  saveMeeting,
  removeUserFromMeeting,
};

export default actions;
