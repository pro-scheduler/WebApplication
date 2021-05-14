// you can put here any notification/message you want to use in redux State

enum messageStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  NO_DISPLAY = 'NO_DISPLAY',
}

type messagesState = {
  createMeetingMessageStatus: string;
  createMeetingMessage: string;
};

const defaultState: messagesState = {
  createMeetingMessageStatus: messageStatus.NO_DISPLAY,
  createMeetingMessage: '',
};

const messagesReducer = (
  state: messagesState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'CREATE_MEETING_SUCCESS':
      return {
        ...state,
        createMeetingMessageStatus: messageStatus.SUCCESS,
        createMeetingMessage: action.payload,
      };
    case 'CREATE_MEETING_FAILED':
      return {
        ...state,
        createMeetingMessageStatus: messageStatus.FAILED,
        createMeetingMessage: action.payload,
      };
    case 'RESET_MEETING_MESSAGE':
      return {
        ...state,
        createMeetingMessageStatus: messageStatus.NO_DISPLAY,
        createMeetingMessage: '',
      };
    default:
      return state;
  }
};

export default messagesReducer;
