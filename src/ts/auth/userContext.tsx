import React from 'react';
import { UserDetails } from '../model/user/ProUser';
const defaultUser: UserDetails = {
  id: 0,
  email: '',
  username: '',
  profilePictureUrl: '',
};

const userContext = React.createContext(defaultUser);

export { userContext, defaultUser };
