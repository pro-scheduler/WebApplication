import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';

const UserLogin = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const user = { name: 'Admin' };

  useEffect(() => {
    dispatch(allActions.userActions.setUser(user));
  }, []);

  return (
    <div>
      {currentUser.loggedIn ? (
        <>
          <h1>Hello, {currentUser.user.name}</h1>
          <button onClick={() => dispatch(allActions.userActions.logOut())}>Logout</button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <button onClick={() => dispatch(allActions.userActions.setUser(user))}>
            Login as Admin
          </button>
        </>
      )}
    </div>
  );
};

export default UserLogin;
