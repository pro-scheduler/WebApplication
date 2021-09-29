import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import InvitationList from '../../components/Invitations/InvitationList';
import { fetchUserPendingInvitations } from '../../API/invitation/invitationService';
import { UserSummary } from '../../model/user/ProUser';
import { InvitationDetails } from '../../model/invitation/Invitation';
import Col from 'react-bootstrap/Col';
import EnvelopIcon from '../../components/common/Icons/EnvelopIcon';
import styles from './Invitations.module.css';
import Row from 'react-bootstrap/Row';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';

const Invitations = ({ user }: { user: UserSummary }) => {
  const [invitations, setInvitations] = useState<InvitationDetails[]>([]);
  const [invitationsResponse, setInvitationsResponse] = useState<ApiCall>(new ApiCall());

  const refreshInvitations = () => {
    fetchUserPendingInvitations(user.id, setInvitations, setInvitationsResponse);
  };

  useEffect(() => {
    refreshInvitations();
    // eslint-disable-next-line
  }, [user.id]);

  return (
    <Container fluid>
      <Row className="justify-content-center mt-4 mb-5">
        <Col lg={12} className="text-center mt-5">
          <EnvelopIcon className={styles.invitationListIcon} />
        </Col>
      </Row>
      {invitationsResponse.isSuccess ? (
        <Row className="justify-content-center mt-4">
          <Col>
            <InvitationList invitations={invitations} refreshInvitations={refreshInvitations} />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center mt-4 mb-5">
          <Col className="text-center mt-5">
            <LoadingSpinner active={invitationsResponse.isLoading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default Invitations;
