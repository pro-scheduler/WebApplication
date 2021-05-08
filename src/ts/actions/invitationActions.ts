import { Dispatch } from 'redux';
import {
  getAcceptInvitationUrl,
  getMeetingInvitationsUrl,
  getRejectInvitationUrl,
  getUserPendingInvitationsUrl,
} from '../API/invitation/urls';
import { BasicInvitationInfo, InvitationEmailsDTO } from '../model/invitation/InvitationDTO';

const fetchUserPendingInvitations = (userId: number) => (dispatch: Dispatch) => {
  fetch(getUserPendingInvitationsUrl(userId))
    .then((response) => response.json())
    .then((basicInvitationInfos: BasicInvitationInfo[]) => {
      return dispatch({ type: 'LOAD_PENDING_INVITATIONS', payload: basicInvitationInfos });
    });
};

const fetchMeetingInvitations = (meetingId: number) => (dispatch: Dispatch) => {
  fetch(getMeetingInvitationsUrl(meetingId))
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
    },
  });
};

const rejectInvitation = (invitationId: number) => {
  return fetch(getRejectInvitationUrl(invitationId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

const createInvitations = (meetingId: number, invitationEmailsDTO: InvitationEmailsDTO) => {
  return fetch(getMeetingInvitationsUrl(meetingId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invitationEmailsDTO),
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
  createInvitations,
  setMeetingIdInInvitations,
};

export default actions;
