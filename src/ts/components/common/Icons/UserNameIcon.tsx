import React from 'react';
import { VscLoading, VscClose } from 'react-icons/vsc';

import styles from './UserNameIcon.module.css';
import { State } from '../../../model/invitation/Invitation';
import LetterIcon from './LetterIcon';
import { UserDetails, UserSummary } from '../../../model/user/ProUser';
import UserIcon from './UserIcon';

export type UserInvitationIconProps = {
  email: string;
  user?: UserSummary | UserDetails;
  state?: State;
};

const UserNameIcon = ({ email, user, state }: UserInvitationIconProps) => {
  return (
    <div className={styles.userNameIconContainer}>
      {user ? <UserIcon user={user} /> : <LetterIcon firstLetter={email.charAt(0)} />}
      <div className={styles.userIconParticipantName}>{email}</div>
      {state === State.PENDING && <VscLoading className={styles.pendingStatus} />}
      {state === State.REJECTED && <VscClose className={styles.rejectedStatus} />}
    </div>
  );
};
export default UserNameIcon;
