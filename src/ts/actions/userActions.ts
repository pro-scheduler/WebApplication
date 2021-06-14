import {
  getCurrentUserUrl,
  getUserOrganizedMeetingsUrl,
  getUserParticipatedMeetingsUrl,
} from '../API/user/urls';
import { Dispatch } from 'redux';
import { MeetingDTO } from '../model/meeting/Meeting';
import { UserResponse } from '../model/user/ProUser';
import Cookies from 'js-cookie';

const fetchUserOrganizedMeetings = (userId: number) => (dispatch: Dispatch) => {
  fetch(getUserOrganizedMeetingsUrl(userId))
    .then((response: Response) => response.json())
    .then((organizedMeetingsDTO: MeetingDTO[]) => {
      return dispatch({
        type: 'LOAD_ORGANIZED_MEETINGS',
        payload: organizedMeetingsDTO,
      });
    });
};

const fetchUserParticipatedMeetings = (userId: number) => (dispatch: Dispatch) => {
  return fetch(getUserParticipatedMeetingsUrl(userId), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response: Response) => response.json())
    .then((participatedMeetingsDTO: MeetingDTO[]) => {
      return dispatch({
        type: 'LOAD_PARTICIPATED_MEETINGS',
        payload: participatedMeetingsDTO,
      });
    });
};

const fetchCurrentUser = () => (dispatch: Dispatch) => {
  return fetch(getCurrentUserUrl(), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response: Response) => response.json())
    .then((userResponse: UserResponse) => {
      return dispatch({
        type: 'UPDATE_USER_DETAILS',
        payload: userResponse,
      });
    });
};

const actions = {
  fetchUserOrganizedMeetings,
  fetchUserParticipatedMeetings,
  fetchCurrentUser,
};

export default actions;
