import { getCurrentUserUrl, getUserUrl } from './urls';
import { get, put } from '../genericApiCalls';
import { UserUpdateRequest } from '../../model/user/ProUser';

export const fetchCurrentUser = (setUser: Function, setResponse?: Function) =>
  get(getCurrentUserUrl(), setUser, setResponse);

export const editUser = (
  userId: number,
  userUpdateRequest: UserUpdateRequest,
  onSuccess?: Function,
  setResponse?: Function,
  setData?: Function
) => {
  put(
    userUpdateRequest,
    getUserUrl(userId),
    setData,
    setResponse,
    true,
    'Your username has been updated successfully',
    onSuccess
  );
};
