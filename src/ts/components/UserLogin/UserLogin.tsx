import React, { Dispatch, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import allActions from '../../actions';

const UserLogin = () => {
  const currentUser: any = useSelector((state: RootStateOrAny) => state.userReducer);
  const dispatch: Dispatch<any> = useDispatch();

  const user = { name: 'Admin' };

  useEffect(() => {
    dispatch(allActions.userActions.setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
