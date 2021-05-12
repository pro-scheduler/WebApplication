import React from 'react';
import { VscLoading, VscClose } from 'react-icons/vsc';
import { TiTick } from 'react-icons/ti';

import './UserIcon.css';
import { State } from '../../model/invitation/Invitation';
import { FcManager } from 'react-icons/fc';

export type UserInvitationIconProps = {
  email: string;
  state: State;
};

const UserInvitationIcon = ({ email, state }: UserInvitationIconProps) => {
  return (
    <>
      <div className="userIcon">
        <FcManager />
      </div>
      <div className="ml-3 userIconParticipantName">{email}</div>
      {state === State.PENDING && <VscLoading className="ml-2 pendingStatus" />}
      {state === State.ACCEPTED && <TiTick className="ml-2 acceptedStatus" />}
      {state === State.REJECTED && <VscClose className="ml-2 rejectedStatus" />}
    </>
  );
};
export default UserInvitationIcon;
