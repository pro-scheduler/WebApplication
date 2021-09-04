import React from 'react';
import { UserSummary } from '../model/user/ProUser';

const defaultUser: UserSummary = {
  id: 0,
  email: '',
  username: '',
};

const userContext = React.createContext(defaultUser);

export { userContext, defaultUser };
