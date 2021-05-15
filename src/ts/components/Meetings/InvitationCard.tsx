import React from 'react';

import styles from './MeetingCard.module.css';
import invitationStyles from './InvitationCard.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import allActions from '../../actions';
import { ProUser } from '../../model/user/ProUser';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

const InvitationCard = (invitation: BasicInvitationInfo) => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const dispatch: Function = useDispatch();

  const refreshMeetings = () => {
    dispatch(allActions.userActions.fetchUserParticipatedMeetings(user.id));
    dispatch(allActions.invitationActions.fetchUserPendingInvitations(user.id));
  };

  const acceptInvitation = (invitationId: number) => {
    allActions.invitationActions.acceptInvitation(invitationId).then(refreshMeetings);
  };
  const rejectInvitation = (invitationId: number) => {
    allActions.invitationActions.rejectInvitation(invitationId).then(refreshMeetings);
  };

  return (
    <Col xs={8} sm={8} md={8} lg={8} xl={3}>
      <div className={styles.meetingCard}>
        <div className={styles.meetingCardTitle}>{invitation.basicMeetingDetailsDTO.name}</div>
        <Container className="container-fluid pt-0 mt-0 pl-0">
          <Row className="mt-0 mx-0 pl-0">
            <Col lg={12} className="text-left pl-0 ml-0">
              <div className={styles.meetingCardDescription}>
                {invitation.basicMeetingDetailsDTO.description}
              </div>
            </Col>
            <Col lg={12} className="text-center mx-auto mt-4">
              <AiFillPlusCircle
                className={invitationStyles.acceptInvitationButton}
                onClick={() => acceptInvitation(invitation.invitationId)}
              />
              <AiFillMinusCircle
                className={invitationStyles.rejectInvitationButton}
                onClick={() => rejectInvitation(invitation.invitationId)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default InvitationCard;
