import { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import styles from './UserIcon.module.css';
import YesNoPopup from '../../common/Popup/YesNoPopup';
import { removeAttendeeFromMeeting } from '../../../API/meeting/meetingService';
import { UserDetails, UserSummary } from '../../../model/user/ProUser';
import UserIcon from '../../common/Icons/UserIcon';
export type UserIconProps = {
  user: UserSummary | UserDetails;
  meetingId: number;
  attendeeId: number;
  canDelete: boolean;
  refreshParticipants?: (value: number) => void;
};

const UserInfoIcon = ({
  user,
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
      <UserIcon user={user} />
      <div className={styles.userIconParticipantName}>{user.username}</div>
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

export default UserInfoIcon;
