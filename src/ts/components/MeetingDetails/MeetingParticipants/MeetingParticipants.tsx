import { useEffect, useState } from 'react';
import styles from './MeetingParticipants.module.css';
import UserNameIcon from '../../common/Icons/UserNameIcon';
import { InvitationDetails, State } from '../../../model/invitation/Invitation';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';
import {
  createInvitations,
  fetchMeetingInvitations,
} from '../../../API/invitation/invitationService';
import { ApiCall } from '../../../API/genericApiCalls';
import Card from '../../common/Card/Card';
import DeleteButton from '../../common/SubmitButton/ActionButton/DeleteButton';
import { removeAttendeeFromMeeting } from '../../../API/meeting/meetingService';
import ParticipantsStatusNavbar from './ParticipantsStatusNavbar';
import Popup from '../../common/Popup/Popup';
import CreateInvitations from '../../CreateMeeting/CreateInvitations';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { MeetingAttendeeDetails, MeetingState } from '../../../model/meeting/Meeting';

export type MeetingParticipantsProps = {
  meetingId: number;
  isOrganizer: boolean;
  refreshParticipants: Function;
  participants: MeetingAttendeeDetails[];
  state: MeetingState;
};

const MeetingParticipants = ({
  meetingId,
  isOrganizer,
  refreshParticipants,
  participants,
  state,
}: MeetingParticipantsProps) => {
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [invitationMessage, setInvitationMessage] = useState<string>('');
  const [invitations, setInvitations] = useState<InvitationDetails[]>([]);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());
  const [invitationsChanged, setInvitationsChanged] = useState<boolean>(false);
  const [invitationState, setInvitationState] = useState<State>(State.ACCEPTED);
  const [addModalShow, setAddModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchMeetingInvitations(meetingId, setInvitations);
    // eslint-disable-next-line
  }, [invitationsChanged]);

  const deleteParticipant = (attendeeId: number) => {
    removeAttendeeFromMeeting(meetingId, attendeeId, refreshParticipants);
  };

  const sendInvitations = () => {
    createInvitations(
      {
        meetingId: meetingId,
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        message: invitationMessage,
      },
      setSaveResponse
    );
    setAddModalShow(false);
  };

  useEffect(() => {
    if (saveResponse.isSuccess) {
      setEmails([]);
      setInvitationsChanged(!invitationsChanged);
    }
    // eslint-disable-next-line
  }, [saveResponse]);

  const invitationsToList = (invitationDetailsList: InvitationDetails[]) => {
    return invitationDetailsList.map((invitationDetails: InvitationDetails, index: number) => {
      return (
        <div key={index + invitationDetails.state}>
          <div className={styles.participantRow}>
            <div className={styles.userNameIcon}>
              <UserNameIcon email={invitationDetails.user.username} />
            </div>
          </div>
          <hr className={styles.hrLine} />
        </div>
      );
    });
  };

  const acceptedInvitations = participants.map(
    (participant: MeetingAttendeeDetails, index: number) => {
      return (
        <div key={participant.attendeeId}>
          <div className={styles.participantRow}>
            <div className={styles.userNameIcon}>
              <UserNameIcon email={participant.user.username} />
            </div>
            {isOrganizer && state === MeetingState.OPEN && (
              <div className={styles.deleteContainer}>
                <DeleteButton onDelete={() => deleteParticipant(participant.attendeeId)} />
              </div>
            )}
          </div>
          <hr className={styles.hrLine} />
        </div>
      );
    }
  );

  const pendingInvitations = invitationsToList(
    invitations.filter(
      (invitationDetails: InvitationDetails) => invitationDetails.state === State.PENDING
    )
  );

  const rejectedInvitations = invitationsToList(
    invitations.filter(
      (invitationDetails: InvitationDetails) => invitationDetails.state === State.REJECTED
    )
  );

  return (
    <Card
      title={'Who'}
      onAdd={isOrganizer && state === MeetingState.OPEN ? () => setAddModalShow(true) : undefined}
    >
      <ParticipantsStatusNavbar
        accepted={acceptedInvitations.length}
        pending={pendingInvitations.length}
        rejected={rejectedInvitations.length}
        setState={setInvitationState}
        currentState={invitationState}
      />
      <hr className={styles.hrLine} />
      {invitationState === State.ACCEPTED && (
        <div className={styles.selectedParticipants}>
          {acceptedInvitations.length > 0
            ? acceptedInvitations
            : 'There are no accepted invitations'}
        </div>
      )}
      {invitationState === State.PENDING && (
        <div className={styles.selectedParticipants}>
          {pendingInvitations.length > 0 ? pendingInvitations : 'There are no pending invitations'}
        </div>
      )}
      {invitationState === State.REJECTED && (
        <div className={styles.selectedParticipants}>
          {rejectedInvitations.length > 0
            ? rejectedInvitations
            : 'There are no rejected invitations'}
        </div>
      )}
      <Popup
        show={addModalShow}
        title={'Add participants to the meeting'}
        onClose={() => setAddModalShow(false)}
      >
        <CreateInvitations
          state={'invitations'}
          showIcon={false}
          emails={emails}
          setEmails={setEmails}
          oneColumn={true}
          setInvitationMessage={setInvitationMessage}
        />
        <ActionButton
          onclick={sendInvitations}
          text={'Send invitations'}
          className={styles.inviteButton}
        />
      </Popup>
    </Card>
  );
};

export default MeetingParticipants;
