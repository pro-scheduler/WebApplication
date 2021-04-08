import React, { Dispatch, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import allActions from '../../actions';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';

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
          <ActionButton
            text="Logout"
            onclick={() => dispatch(allActions.userActions.logOut())}
            className=""
          />
        </>
      ) : (
        <>
          <h1>Login</h1>
          <ActionButton
            text="Login as Admin"
            onclick={() => dispatch(allActions.userActions.setUser(user))}
            className=""
          />
        </>
      )}
    </div>
  );
};

export default UserLogin;
