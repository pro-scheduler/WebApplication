// you can put here any notification/message you want to use in redux State

export const crateMeetingSuccess = (message: string) => {
  return {
    type: 'CREATE_MESSAGE_SUCCESS',
    payload: message,
  };
};
export const crateMeetingFailed = (message: string) => {
  return {
    type: 'CREATE_MESSAGE_FAILD',
    payload: message,
  };
};
export const crateMeetingReset = () => {
  return {
    type: 'RESET_CREATE_MESSAGE',
    payload: null,
  };
};

const actions = {
  crateMeetingSuccess,
  crateMeetingFailed,
  crateMeetingReset,
};

export default actions;
