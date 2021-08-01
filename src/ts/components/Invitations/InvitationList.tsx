import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EnvelopIcon from '../common/Icons/EnvelopIcon';
import styles from './InvitationList.module.css';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import Card from '../common/Card/Card';
import { Table } from 'react-bootstrap';
import { acceptInvitation, rejectInvitation } from '../../API/invitation/invitationService';
import DeleteButton from '../common/SubmitButton/ActionButton/DeleteButton';
import YesButton from '../common/SubmitButton/ActionButton/YesButton';

export type InvitationListProps = {
  invitations: BasicInvitationInfo[];
  refreshInvitations: (value: number) => void;
};
const InvitationList = ({ invitations, refreshInvitations }: InvitationListProps) => {
  const invitationRows = invitations.map((invitation: BasicInvitationInfo, index: number) => {
    return (
      <tr key={index}>
        <td>{invitation.basicMeetingDetailsDTO.name}</td>
        <td>{invitation.basicMeetingDetailsDTO.description}</td>
        <td>
          <div className={styles.acceptRejectContainer}>
            <YesButton
              onAccept={() =>
                acceptInvitation(invitation.invitationId, () => refreshInvitations(Math.random()))
              }
            />
            <DeleteButton
              onDelete={() =>
                rejectInvitation(invitation.invitationId, () => refreshInvitations(Math.random()))
              }
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Row className="justify-content-center mt-4 mr-5" style={{ marginLeft: '6%' }}>
        <Col lg={12} className="text-center mt-5">
          <EnvelopIcon className={styles.invitationListIcon} />
        </Col>
        <Col lg={12} className={styles.invitationListHeader}>
          {'Your invitations'}
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 ml-sm-5">
        <Col>
          <Card title={'Your invitations'}>
            {invitations.length > 0 ? (
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Meeting name</th>
                    <th>Description</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{invitationRows}</tbody>
              </Table>
            ) : (
              <div>You don't have any invitations</div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InvitationList;
