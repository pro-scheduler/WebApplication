import { ProUser } from '../model/user/ProUser';

const defaultState: ProUser = {
  id: 1,
  email: 'ala@gmail.com',
  nickname: 'ala',
  organizedMeetings: [],
  participatedMeetings: [],
};

const userReducer = (state: ProUser = defaultState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'LOAD_ORGANIZED_MEETINGS':
      console.log(action);
      return {
        ...state,
        organizedMeetings: action.payload,
      };
    case 'LOAD_PARTICIPATED_MEETINGS':
      console.log(action);
      return {
        ...state,
        participatedMeetings: action.payload,
      };
    case 'UPDATE_USER_DETAILS':
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        nickname: action.payload.nickname,
        organizedMeetings: [],
        participatedMeetings: [],
      };
    default:
      return state;
  }
};

export default userReducer;
