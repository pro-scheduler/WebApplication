import React, { useState } from 'react';
import { FcManager } from 'react-icons/fc';
import { TiDelete } from 'react-icons/ti';

import styles from './UserIcon.module.css';
import allActions from '../../actions';
import Popup from '../common/Popup/Popup';

export type UserIconProps = {
  name: String;
  meetingId: number;
  userId: number;
  canDelete: boolean;
};

const UserIcon = ({ name, meetingId, userId, canDelete }: UserIconProps) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteParticipant = () => {
    allActions.meetingActions.removeUserFromMeeting(meetingId, userId);
    setModalShow(false);
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
