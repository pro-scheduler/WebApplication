import Card from '../common/Card/Card';
import { BiWorld, BiCalendarEvent } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './MeetingDetailsInfo.module.css';
import React, { useState } from 'react';
import cx from 'classnames';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import YesNoPopup from '../common/Popup/YesNoPopup';
import { useHistory } from 'react-router';
import { leaveMeeting } from '../../API/meeting/meetingService';

export type MeetingDetailsInfoProps = {
  hasSurvey: boolean;
  hasDeclarations: boolean;
  hasTime: boolean;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
  isOrganizer: boolean;
  meetingId: number;
};

const MeetingDetailsInfo = ({
  hasDeclarations,
  hasSurvey,
  hasTime,
  meetingLink,
  meetingPassword,
  isOrganizer,
  meetingId,
}: MeetingDetailsInfoProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cancelMeetingModal, setCancelMeetingModal] = useState(false);
  const [leaveMeetingModal, setLeaveMeetingModal] = useState(false);
  const history = useHistory();

  // TODO send to backend
  const cancelTheMeeting = () => {
    setCancelMeetingModal(false);
  };

  const leaveTheMeeting = () => {
    setLeaveMeetingModal(false);
    leaveMeeting(
      meetingId,
      () => void 0,
      () => void 0,
      () => history.push('/meetings')
    );
  };

  return (
    <Card
      title={'Details'}
      footer={
        <div className={styles.actionButtonContainer}>
          {isOrganizer ? (
            <ActionButton
              onclick={() => setCancelMeetingModal(true)}
              text={'Cancel the meeting'}
              className={styles.actionButton}
            />
          ) : (
            <ActionButton
              onclick={() => setLeaveMeetingModal(true)}
              text={'Leave the meeting'}
              className={styles.actionButton}
            />
          )}
        </div>
      }
    >
      <div className={styles.container}>
        <p className={styles.moduleContainer}>
          <BiCalendarEvent className={styles.moduleIcon} />{' '}
          {hasTime ? 'Time available' : 'No time available'}
        </p>
        <p className={styles.moduleContainer}>
          <BiWorld className={styles.moduleIcon} />{' '}
          {meetingLink ? (
            <>
              <a href={meetingLink} className={styles.onlineMeetingLink}>
                {meetingLink}
              </a>
              {meetingPassword && (
                <>
                  <RiLockPasswordFill
                    className={cx(styles.moduleIcon, styles.passwordIcon)}
                    onMouseEnter={() => setShowPassword(true)}
                    onMouseLeave={() => setShowPassword(false)}
                  />
                  {showPassword && meetingPassword}
                </>
              )}
            </>
          ) : (
            'No place available'
          )}
        </p>
        <p className={styles.moduleContainer}>
          <FaRegClipboard className={styles.moduleIcon} />{' '}
          {hasSurvey ? 'Survey available' : 'No surveys available'}
        </p>
        <p className={styles.moduleContainer}>
          <BsPencil className={styles.moduleIcon} />{' '}
          {hasDeclarations ? 'Declarations available' : 'No declarations available'}
        </p>
      </div>
      <YesNoPopup
        show={cancelMeetingModal}
        title={'Do you want to cancel the meeting?'}
        onDecline={() => setCancelMeetingModal(false)}
        onAccept={cancelTheMeeting}
      />
      <YesNoPopup
        show={leaveMeetingModal}
        title={'Do you want to leave the meeting?'}
        onDecline={() => setLeaveMeetingModal(false)}
        onAccept={leaveTheMeeting}
      />
    </Card>
  );
};
export default MeetingDetailsInfo;
