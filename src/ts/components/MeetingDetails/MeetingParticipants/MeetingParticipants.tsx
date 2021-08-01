import { useEffect, useState } from 'react';
import styles from './MeetingParticipants.module.css';
import UserNameIcon from '../../common/Icons/UserNameIcon';
import { BasicInvitationInfo, State } from '../../../model/invitation/Invitation';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';
import {
  createInvitations,
  fetchMeetingInvitations,
} from '../../../API/invitation/invitationService';
import { ApiCall } from '../../../API/genericApiCalls';
import Card from '../../common/Card/Card';
import DeleteButton from '../../common/SubmitButton/ActionButton/DeleteButton';
import { removeUserFromMeeting } from '../../../API/meeting/meetingService';
import ParticipantsStatusNavbar from './ParticipantsStatusNavbar';

export type MeetingParticipantsProps = {
  meetingId: number;
  isOrganizer: boolean;
  refreshParticipants: (value: number) => void;
};

const MeetingParticipants = ({
  meetingId,
  isOrganizer,
  refreshParticipants,
}: MeetingParticipantsProps) => {
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [invitations, setInvitations] = useState<BasicInvitationInfo[]>([]);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());
  const [invitationsChanged, setInvitationsChanged] = useState<boolean>(false);
  const [state, setState] = useState<State>(State.ACCEPTED);

  useEffect(() => {
    fetchMeetingInvitations(meetingId, setInvitations);
    // eslint-disable-next-line
  }, [invitationsChanged]);

  const deleteParticipant = (userId: number) => {
    removeUserFromMeeting(meetingId, userId);
    if (refreshParticipants) refreshParticipants(Math.random());
  };

  const sendInvitations = () => {
    createInvitations(
      meetingId,
      {
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
      },
      setSaveResponse
    );
  };

  useEffect(() => {
    if (saveResponse.isSuccess) {
      setEmails([]);
      setInvitationsChanged(!invitationsChanged);
    }
    // eslint-disable-next-line
  }, [saveResponse]);

  const invitationsToList = (basicInvitationsInfo: BasicInvitationInfo[]) => {
    return basicInvitationsInfo.map((basicInvitationInfo: BasicInvitationInfo, index: number) => {
      return (
        <div key={index + basicInvitationInfo.state}>
          <div className={styles.participantRow}>
            <div className={styles.userNameIcon}>
              <UserNameIcon email={basicInvitationInfo.basicUserInfoDTO.email} />
            </div>
            {isOrganizer && basicInvitationInfo.state === State.ACCEPTED && (
              <div className={styles.deleteContainer}>
                <DeleteButton
                  onDelete={() => deleteParticipant(basicInvitationInfo.basicUserInfoDTO.id)}
                />
              </div>
            )}
          </div>
          <hr className={styles.hrLine} />
        </div>
      );
    });
  };

  const pendingInvitations = invitationsToList(
    invitations.filter(
      (basicInvitationInfo: BasicInvitationInfo) => basicInvitationInfo.state === State.PENDING
    )
  );
  const acceptedInvitations = invitationsToList(
    invitations.filter(
      (basicInvitationInfo: BasicInvitationInfo) => basicInvitationInfo.state === State.ACCEPTED
    )
  );

  const rejectedInvitations = invitationsToList(
    invitations.filter(
      (basicInvitationInfo: BasicInvitationInfo) => basicInvitationInfo.state === State.REJECTED
    )
  );

  return (
    <Card title={'Who'}>
      <ParticipantsStatusNavbar
        accepted={acceptedInvitations.length}
        pending={pendingInvitations.length}
        rejected={rejectedInvitations.length}
        setState={setState}
      />
      <hr className={styles.hrLine} />
      {state === State.ACCEPTED && (
        <div className={styles.selectedParticipants}>
          {acceptedInvitations.length > 0
            ? acceptedInvitations
            : 'There are no accepted invitations'}
        </div>
      )}
      {state === State.PENDING && (
        <div className={styles.selectedParticipants}>
          {pendingInvitations.length > 0 ? pendingInvitations : 'There are no pending invitations'}
        </div>
      )}
      {state === State.REJECTED && (
        <div className={styles.selectedParticipants}>
          {rejectedInvitations.length > 0
            ? rejectedInvitations
            : 'There are no rejected invitations'}
        </div>
      )}
    </Card>
  );
};

export default MeetingParticipants;
