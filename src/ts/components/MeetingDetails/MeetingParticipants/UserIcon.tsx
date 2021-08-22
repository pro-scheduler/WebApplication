import { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import styles from './UserIcon.module.css';
import YesNoPopup from '../../common/Popup/YesNoPopup';
import LetterIcon from '../../common/Icons/LetterIcon';
import { removeAttendeeFromMeeting } from '../../../API/meeting/meetingService';
export type UserIconProps = {
  name: String;
  meetingId: number;
  attendeeId: number;
  canDelete: boolean;
  refreshParticipants?: (value: number) => void;
};

const UserIcon = ({
  name,
  meetingId,
  attendeeId,
  canDelete,
  refreshParticipants,
}: UserIconProps) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteParticipant = () => {
    removeAttendeeFromMeeting(meetingId, attendeeId);
    setModalShow(false);
    if (refreshParticipants) refreshParticipants(Math.random());
  };
  return (
    <>
      <LetterIcon firstLetter={name.charAt(0)} />
      <div className={styles.userIconParticipantName}>{name}</div>
      {canDelete && (
        <TiDelete className={styles.deleteUserButton} onClick={() => setModalShow(true)} />
      )}
      <YesNoPopup
        show={modalShow}
        title={'Are you sure you want to remove the participant from the meeting?'}
        onDecline={() => setModalShow(false)}
        onAccept={deleteParticipant}
      />
    </>
  );
};

export default UserIcon;
