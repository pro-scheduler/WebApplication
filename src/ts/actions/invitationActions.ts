import { Dispatch } from 'redux';
import {
  getAcceptInvitationUrl,
  getMeetingInvitationsUrl,
  getRejectInvitationUrl,
  getUserPendingInvitationsUrl,
} from '../API/invitation/urls';
import { BasicInvitationInfo } from '../model/invitation/Invitation';
import Cookies from 'js-cookie';

const fetchUserPendingInvitations = (userId: number) => (dispatch: Dispatch) => {
  fetch(getUserPendingInvitationsUrl(userId), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response) => response.json())
    .then((basicInvitationInfos: BasicInvitationInfo[]) => {
      return dispatch({ type: 'LOAD_PENDING_INVITATIONS', payload: basicInvitationInfos });
    });
};

const fetchMeetingInvitations = (meetingId: number) => (dispatch: Dispatch) => {
  fetch(getMeetingInvitationsUrl(meetingId), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response) => response.json())
    .then((basicInvitationInfos: BasicInvitationInfo[]) => {
      return dispatch({ type: 'LOAD_MEETING_INVITATIONS', payload: basicInvitationInfos });
    });
};

const acceptInvitation = (invitationId: number) => {
  return fetch(getAcceptInvitationUrl(invitationId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  });
};

const rejectInvitation = (invitationId: number) => {
  return fetch(getRejectInvitationUrl(invitationId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  });
};

const setMeetingIdInInvitations = (meetingId: number) => (dispatch: Dispatch) => {
  return dispatch({ type: 'SET_MEETING_ID', payload: { meetingId } });
};

const actions = {
  fetchUserPendingInvitations,
  fetchMeetingInvitations,
  acceptInvitation,
  rejectInvitation,
  setMeetingIdInInvitations,
};

export default actions;
