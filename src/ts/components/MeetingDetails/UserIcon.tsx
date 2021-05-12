import React, { useState } from 'react';
import { FcManager } from 'react-icons/fc';
import { TiDelete } from 'react-icons/ti';

import './UserIcon.css';
import allActions from '../../actions';
import Popup from '../common/Popup/Popup';

export type UserIconProps = {
  name: String;
  meetingId: number;
  userId: number;
  canDelete: boolean;
  fontBold: boolean;
};

const UserIcon = ({ name, meetingId, userId, canDelete, fontBold }: UserIconProps) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteParticipant = () => {
    allActions.meetingActions.removeUserFromMeeting(meetingId, userId);
    setModalShow(false);
  };
  return (
    <>
      <div className="userIcon">
        <FcManager />
      </div>
      {fontBold ? (
        <div className="ml-3 userIconParticipantName userIconOrganizerName">{name}</div>
      ) : (
        <div className="ml-3 userIconParticipantName">{name}</div>
      )}
      {canDelete && (
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
