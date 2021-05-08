import { BasicInvitationInfo } from '../model/invitation/InvitationDTO';

type invitationsState = { basicInvitationInfos: BasicInvitationInfo[]; meetingId: number };

const defaultState: invitationsState = {
  meetingId: 0,
  basicInvitationInfos: [],
};

const invitationReducer = (
  state: invitationsState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'LOAD_PENDING_INVITATIONS':
      console.log(action);
      return { ...state, basicInvitationInfos: action.payload };
    case 'LOAD_MEETING_INVITATIONS':
      console.log(action);
      return { ...state, basicInvitationInfos: action.payload };
    case 'SET_MEETING_ID':
      console.log(action);
      return { ...state, meetingId: action.payload.meetingId };
    default:
      return state;
  }
};

export default invitationReducer;
