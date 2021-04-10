// you can put here any notification/message you want to use in redux State

type messagesState = {
  createMeetingMessageStatus: string;
  createMeetingMessage: string;
};

const defaultState: messagesState = {
  createMeetingMessageStatus: 'NO_DISPLAY',
  createMeetingMessage: '',
};

const messagesReducer = (
  state: messagesState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'CREATE_MESSAGE_SUCCESS':
      return {
        ...state,
        createMeetingMessageStatus: 'SUCCESS',
        createMeetingMessage: action.payload,
      };
    case 'CREATE_MESSAGE_FAILD':
      return {
        ...state,
        createMeetingMessageStatus: 'FAILED',
        createMeetingMessage: action.payload,
      };
    case 'RESET_CREATE_MESSAGE':
      return {
        ...state,
        createMeetingMessageStatus: 'NO_DISPLAY',
        createMeetingMessage: '',
      };
    default:
      return state;
  }
};

export default messagesReducer;
