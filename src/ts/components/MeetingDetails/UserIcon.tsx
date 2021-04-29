import React, { useState } from 'react';
import { FcManager } from 'react-icons/fc';
import { TiDelete } from 'react-icons/ti';

import './UserIcon.css';
import allActions from '../../actions';
import Popup from '../common/Popup/Popup';

interface IUserIcon {
  name: String;
  meetingId: number;
  userId: number;
  canDelete: boolean;
  fontBold: boolean;
}

const UserIcon = (user: IUserIcon) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteParticipant = () => {
    allActions.meetingActions.removeUserFromMeeting(user.meetingId, user.userId);
    setModalShow(false);
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
      {user.canDelete && (
        <TiDelete className="ml-2 deleteUserButton" onClick={() => setModalShow(true)} />
      )}
      <Popup
        show={modalShow}
        information={'Are you sure you want to remove the participant from the meeting?'}
        onDecline={() => setModalShow(false)}
        onAccept={deleteParticipant}
      />
    </>
  );
};

export default UserIcon;
