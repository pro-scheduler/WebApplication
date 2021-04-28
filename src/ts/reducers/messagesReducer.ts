// you can put here any notification/message you want to use in redux State

type messagesState = {
  createMeetingMessageStatus: string;
  createMeetingMessage: string;
  createSurveyMessageStatus: string;
  createSurveyMessage: string;
};

const defaultState: messagesState = {
  createMeetingMessageStatus: 'NO_DISPLAY',
  createMeetingMessage: '',
  createSurveyMessageStatus: 'NO_DISPLAY',
  createSurveyMessage: '',
};

const messagesReducer = (
  state: messagesState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'CREATE_MEETING_SUCCESS':
      return {
        ...state,
        createMeetingMessageStatus: 'SUCCESS',
        createMeetingMessage: action.payload,
      };
    case 'CREATE_MEETING_FAILED':
      return {
        ...state,
        createMeetingMessageStatus: 'FAILED',
        createMeetingMessage: action.payload,
      };
    case 'RESET_MEETING_MESSAGE':
      return {
        ...state,
        createMeetingMessageStatus: 'NO_DISPLAY',
        createMeetingMessage: '',
      };
    case 'CREATE_SURVEY_SUCCESS':
      return {
        ...state,
        createSurveyMessageStatus: 'SUCCESS',
        createSurveyMessage: action.payload,
      };
    case 'CREATE_SURVEY_FAILED':
      return {
        ...state,
        createSurveyMessageStatus: 'FAILED',
        createSurveyMessage: action.payload,
      };
    case 'RESET_SURVEY_MESSAGE':
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
