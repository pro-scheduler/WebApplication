import { Dispatch } from 'redux';
import { getMeetingsUrl, getMeetingUrl, getRemoveUserFromMeetingUrl } from '../API/meeting/urls';
import { DeepMeetingDetailsDTO, Meeting, MeetingDTO } from '../model/meeting/Meeting';
import Cookies from 'js-cookie';

const fetchAllMeetings = () => (dispatch: Dispatch) => {
  fetch(getMeetingsUrl(), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response) => response.json())
    .then((meetingsDTO: MeetingDTO[]) => {
      return dispatch({ type: 'LOAD_ALL', payload: meetingsDTO });
    });
};

const loadMeeting = (id: number) => (dispatch: Dispatch) => {
  fetch(getMeetingUrl(id), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
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
      Authorization: `Bearer ${Cookies.get('access_token')}`,
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
  removeUserFromMeeting,
};

export default actions;
