import { getCurrentUserUrl } from '../API/user/urls';
import { Dispatch } from 'redux';
import { UserResponse } from '../model/user/ProUser';
import Cookies from 'js-cookie';

const fetchCurrentUser = () => (dispatch: Dispatch) => {
  return fetch(getCurrentUserUrl(), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response: Response) => response.json())
    .then((userResponse: UserResponse) => {
      return dispatch({
        type: 'UPDATE_USER_DETAILS',
        payload: userResponse,
      });
    });
};

const actions = {
  fetchCurrentUser,
};

export default actions;
