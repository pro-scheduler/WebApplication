const setUser = (userObj: any) => {
  return {
    type: 'SET_USER',
    payload: userObj,
  };
};

const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

const actions = { setUser, logOut };

export default actions;
