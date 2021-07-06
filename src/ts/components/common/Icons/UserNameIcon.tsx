import React from 'react';
import { VscLoading, VscClose } from 'react-icons/vsc';

import styles from './UserNameIcon.module.css';
import { State } from '../../../model/invitation/Invitation';
import LetterIcon from './LetterIcon';

export type UserInvitationIconProps = {
  email: string;
  state?: State;
};

const UserNameIcon = ({ email, state }: UserInvitationIconProps) => {
  return (
    <>
      <LetterIcon firstLetter={email.charAt(0)} />
      <div className={styles.userIconParticipantName}>{email}</div>
      {state === State.PENDING && <VscLoading className={styles.pendingStatus} />}
      {state === State.REJECTED && <VscClose className={styles.rejectedStatus} />}
    </>
  );
};
export default UserNameIcon;
