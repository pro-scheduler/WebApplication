import { Dispatch } from 'redux';
import { getMeetingInvitationsUrl, getUserPendingInvitationsUrl } from '../API/invitation/urls';
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

const actions = {
  fetchUserPendingInvitations,
  fetchMeetingInvitations,
};

export default actions;
