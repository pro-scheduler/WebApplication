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

export type MeetingDetailsInfoProps = {
  hasSurvey: boolean;
  hasDeclarations: boolean;
  hasTime: boolean;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
  isOrganizer: boolean;
};

const MeetingDetailsInfo = ({
  hasDeclarations,
  hasSurvey,
  hasTime,
  meetingLink,
  meetingPassword,
  isOrganizer,
}: MeetingDetailsInfoProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);
  // TODO send to backend
  const cancelMeeting = () => {
    setModalShow(false);
  };
  return (
    <Card
      title={'Details'}
      footer={
        isOrganizer ? (
          <div className={styles.cancelMeetingButtonContainer}>
            <ActionButton
              onclick={() => setModalShow(true)}
              text={'Cancel the meeting'}
              className={styles.cancelMeetingButton}
            />
          </div>
        ) : undefined
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
        show={modalShow}
        title={'Do you want to cancel the meeting?'}
        onDecline={() => setModalShow(false)}
        onAccept={cancelMeeting}
      />
    </Card>
  );
};
export default MeetingDetailsInfo;
