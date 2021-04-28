// you can put here any notification/message you want to use in redux State

export const createMeetingSuccess = (message: string) => {
  return {
    type: 'CREATE_MEETING_SUCCESS',
    payload: message,
  };
};
export const createMeetingFailed = (message: string) => {
  return {
    type: 'CREATE_MEETING_FAILED',
    payload: message,
  };
};
export const createMeetingReset = () => {
  return {
    type: 'RESET_MEETING_MESSAGE',
    payload: null,
  };
};

export const createSurveySuccess = (message: string) => {
  return {
    type: 'CREATE_SURVEY_SUCCESS',
    payload: message,
  };
};
export const createSurveyFailed = (message: string) => {
  return {
    type: 'CREATE_SURVEY_FAILED',
    payload: message,
  };
};
export const createSurveyReset = () => {
  return {
    type: 'RESET_SURVEY_MESSAGE',
    payload: null,
  };
};

const actions = {
  createMeetingSuccess,
  createMeetingFailed,
  createMeetingReset,
  createSurveySuccess,
  createSurveyFailed,
  createSurveyReset,
};

export default actions;
