import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EnvelopIcon from '../common/Icons/EnvelopIcon';
import styles from '../Meetings/MeetingList.module.css';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import InvitationCard from './InvitationCard';

export type InvitationListProps = {
  invitations: BasicInvitationInfo[];
  refreshInvitations: (value: number) => void;
};
const InvitationList = ({ invitations, refreshInvitations }: InvitationListProps) => {
  const invitationCards = invitations.map((invitation: BasicInvitationInfo) => {
    return (
      <InvitationCard
        key={invitation.invitationId}
        refreshMeetings={refreshInvitations}
        invitation={invitation}
      />
    );
  });

  return (
    <Row className="justify-content-center mt-4 mr-5" style={{ marginLeft: '6%' }}>
      <Col lg={12} className="text-center mt-5">
        <EnvelopIcon className={styles.meetingListIcon} />
      </Col>
      <Col lg={12} className={styles.meetingListHeader}>
        {'Your invitations'}
      </Col>
      {invitationCards.length > 0 ? invitationCards : <p>You don't have any invitations</p>}
    </Row>
  );
};

export default InvitationList;
