import { Dispatch } from 'redux';
import { getUserPendingInvitationsUrl } from '../API/invitation/urls';
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

const setMeetingIdInInvitations = (meetingId: number) => (dispatch: Dispatch) => {
  return dispatch({ type: 'SET_MEETING_ID', payload: { meetingId } });
};

const actions = {
  fetchUserPendingInvitations,
  setMeetingIdInInvitations,
};

export default actions;
