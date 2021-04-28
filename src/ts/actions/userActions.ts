import { getUserOrganizedMeetingsUrl, getUserParticipatedMeetingsUrl } from '../API/user/urls';
import { Dispatch } from 'redux';
import MeetingDTO from '../model/meeting/MeetingDTO';
import { mapMeetingsDTOToMeetings } from '../model/meeting/MeetingMapper';

const fetchUserOrganizedMeetings = (userId: number) => (dispatch: Dispatch) => {
  fetch(getUserOrganizedMeetingsUrl(userId))
    .then((response: Response) => response.json())
    .then((organizedMeetingsDTO: MeetingDTO[]) => {
      return dispatch({
        type: 'LOAD_ORGANIZED_MEETINGS',
        payload: mapMeetingsDTOToMeetings(organizedMeetingsDTO),
      });
    });
};

const fetchUserParticipatedMeetings = (userId: number) => (dispatch: Dispatch) => {
  return fetch(getUserParticipatedMeetingsUrl(userId))
    .then((response: Response) => response.json())
    .then((participatedMeetings) => {
      return dispatch({
        type: 'LOAD_PARTICIPATED_MEETINGS',
        payload: mapMeetingsDTOToMeetings(participatedMeetings),
      });
    });
};

const actions = {
  fetchUserOrganizedMeetings,
  fetchUserParticipatedMeetings,
};

export default actions;
