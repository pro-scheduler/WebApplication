import Card from '../common/Card/Card';
import { BiWorld, BiCalendarEvent } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './MeetingDetailsInfo.module.css';
import React, { useState } from 'react';
import cx from 'classnames';

export type MeetingDetailsInfoProps = {
  hasSurvey: boolean;
  hasDeclarations: boolean;
  hasTime: boolean;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
};

const MeetingDetailsInfo = ({
  hasDeclarations,
  hasSurvey,
  hasTime,
  meetingLink,
  meetingPassword,
}: MeetingDetailsInfoProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Card title={'Details'}>
      <div>
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
    </Card>
  );
};
export default MeetingDetailsInfo;
