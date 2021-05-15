import React from 'react';
import { VscLoading, VscClose } from 'react-icons/vsc';

import styles from './UserIcon.module.css';
import { State } from '../../model/invitation/Invitation';
import { FcManager } from 'react-icons/fc';

export type UserInvitationIconProps = {
  email: string;
  state: State;
};

const UserInvitationIcon = ({ email, state }: UserInvitationIconProps) => {
  return (
    <>
      <div className={styles.userIcon}>
        <FcManager />
      </div>
      <div className={styles.userIconParticipantName}>{email}</div>
      {state === State.PENDING && <VscLoading className={styles.pendingStatus} />}
      {state === State.REJECTED && <VscClose className={styles.rejectedStatus} />}
    </>
  );
};
export default UserInvitationIcon;
