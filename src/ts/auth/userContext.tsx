import React from 'react';
import { ProUser } from '../model/user/ProUser';

const defaultUser: ProUser = {
  id: 0,
  email: '',
  nickname: '',
  organizedMeetings: [],
  participatedMeetings: [],
};

const userContext = React.createContext(defaultUser);

export { userContext, defaultUser };
