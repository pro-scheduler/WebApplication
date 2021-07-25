import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import InvitationList from '../../components/Invitations/InvitationList';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import { fetchUserPendingInvitations } from '../../API/invitation/invitationService';
import { ProUser } from '../../model/user/ProUser';
import { RootStateOrAny, useSelector } from 'react-redux';

const Invitations = () => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [invitations, setInvitations] = useState<BasicInvitationInfo[]>([]);
  const [refreshInvitations, setRefreshInvitations] = useState<number>(0);

  useEffect(() => {
    fetchUserPendingInvitations(user.id, setInvitations);
    // eslint-disable-next-line
  }, [user.id, refreshInvitations]);
  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <InvitationList invitations={invitations} refreshInvitations={setRefreshInvitations} />
    </Container>
  );
};

export default Invitations;
