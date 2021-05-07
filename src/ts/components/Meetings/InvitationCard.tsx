import React from 'react';

import styles from './MeetingCard.module.css';
import invitationStyles from './InvitationCard.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BasicInvitationInfo } from '../../model/invitation/InvitationDTO';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

const InvitationCard = (invitation: BasicInvitationInfo) => {
  return (
    <Col xs={8} sm={8} md={8} lg={8} xl={3}>
      <div className={styles.meetingCard}>
        <div className={styles.meetingCardTitle}>{invitation.basicMeetingDetailsDTO.name}</div>
        <Container className="container-fluid pt-0 mt-0 pl-0">
          <Row className="mt-0 mx-0 pl-0">
            <Col lg={12} className="text-left pl-0 ml-0">
              <div className={invitationStyles.meetingDescription}>
                {invitation.basicMeetingDetailsDTO.description}
              </div>
            </Col>
            {/* TODO add onclick to buttons*/}
            <Col lg={12} className="text-center mx-auto mt-4">
              <AiFillPlusCircle className={invitationStyles.acceptInvitationButton} />
              <AiFillMinusCircle className={invitationStyles.rejectInvitationButton} />
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default InvitationCard;
