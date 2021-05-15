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

const actions = {
  createMeetingSuccess,
  createMeetingFailed,
  createMeetingReset,
};

export default actions;
