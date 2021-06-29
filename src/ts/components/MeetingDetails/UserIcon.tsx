import React, { useState } from 'react';
import { FcManager } from 'react-icons/fc';
import { TiDelete } from 'react-icons/ti';

import styles from './UserIcon.module.css';
import Popup from '../common/Popup/Popup';
import meetingActions from '../../actions/meetingActions';

export type UserIconProps = {
  name: String;
  meetingId: number;
  userId: number;
  canDelete: boolean;
  refreshParticipants?: (value: number) => void;
};

const UserIcon = ({ name, meetingId, userId, canDelete, refreshParticipants }: UserIconProps) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteParticipant = () => {
    meetingActions.removeUserFromMeeting(meetingId, userId);
    setModalShow(false);
    if (refreshParticipants) refreshParticipants(Math.random());
  };
  return (
    <>
      <div className={styles.userIcon}>
        <FcManager />
      </div>
      <div className={styles.userIconParticipantName}>{name}</div>
      {canDelete && (
        <TiDelete className={styles.deleteUserButton} onClick={() => setModalShow(true)} />
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
