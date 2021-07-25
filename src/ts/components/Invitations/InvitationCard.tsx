import styles from '../Meetings/MeetingCard.module.css';
import invitationStyles from './InvitationCard.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { acceptInvitation, rejectInvitation } from '../../API/invitation/invitationService';

export type InvitationCardProps = {
  invitation: BasicInvitationInfo;
  refreshMeetings: (value: number) => void;
};

const InvitationCard = ({ invitation, refreshMeetings }: InvitationCardProps) => {
  const acceptInvitationLocal = (invitationId: number) => {
    acceptInvitation(invitationId, () => {
      refreshMeetings(Math.random());
    });
  };
  const rejectInvitationLocal = (invitationId: number) => {
    rejectInvitation(invitationId, () => {
      refreshMeetings(Math.random());
    });
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
                onClick={() => acceptInvitationLocal(invitation.invitationId)}
              />
              <AiFillMinusCircle
                className={invitationStyles.rejectInvitationButton}
                onClick={() => rejectInvitationLocal(invitation.invitationId)}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default InvitationCard;
