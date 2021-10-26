import styles from './InvitationList.module.css';
import { InvitationDetails } from '../../model/invitation/Invitation';
import Card from '../common/Card/Card';
import { Table } from 'react-bootstrap';
import { acceptInvitation, rejectInvitation } from '../../API/invitation/invitationService';
import DeleteButton from '../common/SubmitButton/ActionButton/DeleteButton';
import YesButton from '../common/SubmitButton/ActionButton/YesButton';
import SearchBox from '../common/forms/Input/SearchBox';
import { useEffect, useState } from 'react';
import UserNameIcon from '../common/Icons/UserNameIcon';

export type InvitationListProps = {
  invitations: InvitationDetails[];
  refreshInvitations: Function;
};
const InvitationList = ({ invitations, refreshInvitations }: InvitationListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<InvitationDetails[]>(invitations);
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchResults(
      searchTerm !== ''
        ? invitations.filter((invitation: InvitationDetails) =>
            invitation.meeting.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : invitations
    );
  }, [searchTerm, invitations]);

  const invitationRows = searchResults.map((invitation: InvitationDetails, index: number) => {
    return (
      <tr key={index}>
        <td>{invitation.meeting.name}</td>
        <td>
          <UserNameIcon user={invitation.invitedBy} email={invitation.invitedBy.username} />
        </td>
        <td>
          <div className={styles.acceptRejectContainer}>
            <YesButton
              onAccept={() => acceptInvitation(invitation.id, () => refreshInvitations())}
            />
            <DeleteButton
              onDelete={() => rejectInvitation(invitation.id, () => refreshInvitations())}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Card title={'Your invitations'}>
      {invitations.length > 0 ? (
        <div className={styles.invitationsTable}>
          <SearchBox value={searchTerm} onChange={handleChange} />
          <Table responsive="sm" className="mt-4">
            <thead>
              <tr>
                <th>Meeting name</th>
                <th>Invited by</th>
                <th />
              </tr>
            </thead>
            <tbody>{invitationRows}</tbody>
          </Table>
        </div>
      ) : (
        <div>You don't have any invitations</div>
      )}
    </Card>
  );
};

export default InvitationList;
