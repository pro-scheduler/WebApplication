import React from 'react';
import { FcManager } from 'react-icons/fc';

import './UserIcon.css';

interface IUserIcon {
  name: String;
  organizer: boolean;
}

const UserIcon = (user: IUserIcon) => {
  return (
    <>
      <div className="userIcon">
        <FcManager />
      </div>
      {user.organizer ? (
        <div className="ml-3 userName organizerName">{user.name}</div>
      ) : (
        <div className="ml-3 userName">{user.name}</div>
      )}
    </>
  );
};

export default UserIcon;
