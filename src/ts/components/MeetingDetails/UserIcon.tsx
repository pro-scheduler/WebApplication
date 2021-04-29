import React from 'react';
import { FcManager } from 'react-icons/fc';
import { TiDelete } from 'react-icons/ti';

import './UserIcon.css';
import allActions from '../../actions';

interface IUserIcon {
  name: String;
  meetingId: number;
  userId: number;
  canDelete: boolean;
  fontBold: boolean;
}

const UserIcon = (user: IUserIcon) => {
  const onClick = () => {
    allActions.meetingActions.removeUserFromMeeting(user.meetingId, user.userId);
  };
  return (
    <>
      <div className="userIcon">
        <FcManager />
      </div>
      {user.fontBold ? (
        <div className="ml-3 userIconParticipantName userIconOrganizerName">{user.name}</div>
      ) : (
        <div className="ml-3 userIconParticipantName">{user.name}</div>
      )}
      {user.canDelete && <TiDelete className="ml-2 deleteUserButton" onClick={onClick} />}
    </>
  );
};

export default UserIcon;
