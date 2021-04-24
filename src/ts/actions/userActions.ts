import { getUserOrganizedMeetingsUrl, getUserParticipatedMeetingsUrl } from '../API/user/urls';
import { Dispatch } from 'redux';

const fetchUserOrganizedMeetings = (userId: number) => (dispatch: Dispatch) => {
  fetch(getUserOrganizedMeetingsUrl(userId))
    .then((response: Response) => response.json())
    .then((organizedMeetings) => {
      return dispatch({ type: 'LOAD_ORGANIZED_MEETINGS', payload: organizedMeetings });
    });
};

const fetchUserParticipatedMeetings = (userId: number) => (dispatch: Dispatch) => {
  return fetch(getUserParticipatedMeetingsUrl(userId))
    .then((response: Response) => response.json())
    .then((participatedMeetings) => {
      return dispatch({ type: 'LOAD_PARTICIPATED_MEETINGS', payload: participatedMeetings });
    });
};

const actions = {
  fetchUserOrganizedMeetings,
  fetchUserParticipatedMeetings,
};

export default actions;
