import { BasicInvitationInfo } from '../model/invitation/InvitationDTO';

type invitationsState = { basicInvitationInfos: BasicInvitationInfo[] };

const defaultState: invitationsState = {
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
    default:
      return state;
  }
};

export default invitationReducer;
