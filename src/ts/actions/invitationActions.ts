import { Dispatch } from 'redux';
import {
  getAcceptInvitationUrl,
  getMeetingInvitationsUrl,
  getRejectInvitationUrl,
  getUserPendingInvitationsUrl,
} from '../API/invitation/urls';
import { BasicInvitationInfo } from '../model/invitation/InvitationDTO';

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

const actions = {
  fetchUserPendingInvitations,
  fetchMeetingInvitations,
  acceptInvitation,
  rejectInvitation,
};

export default actions;
