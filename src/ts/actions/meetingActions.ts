import Meeting from '../model/meeting/Meeting';
import { Dispatch } from 'redux';
import { crateMeetingSuccess, crateMeetingFailed, crateMeetingReset } from './messagesActions';
import { getMeetingsUrl, getMeetingUrl } from '../API/meeting/urls';
import MeetingDTO from '../model/meeting/MeetingDTO';
import { mapMeetingDTOToMeeting, mapMeetingsDTOToMeetings } from '../model/meeting/MeetingMapper';

const fetchAllMeetings = () => (dispatch: Dispatch) => {
  fetch(getMeetingsUrl())
    .then((response) => response.json())
    .then((meetingsDTO: MeetingDTO[]) => {
      return dispatch({ type: 'LOAD_ALL', payload: mapMeetingsDTOToMeetings(meetingsDTO) });
    });
};

const saveMeeting = (meeting: Meeting) => (dispatch: Dispatch) => {
  dispatch(crateMeetingReset());

  fetch(getMeetingsUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meeting),
  }).then((response) => {
    console.log(response);
    if (response.status === 201) {
      return dispatch(crateMeetingSuccess('Meeting has been created sucessfully :)'));
    } else {
      return dispatch(crateMeetingFailed('Meeting has not been created ;/'));
    }
  });
};

const loadMeeting = (id: number) => (dispatch: Dispatch) => {
  fetch(getMeetingUrl(id))
    .then((response: Response) => response.json())
    .then((meetingDTO: MeetingDTO) => {
      return dispatch({ type: 'LOAD_ONE', payload: mapMeetingDTOToMeeting(meetingDTO) });
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
};

export default actions;
