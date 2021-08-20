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
import { removeUserFromMeeting } from '../../../API/meeting/meetingService';
import ParticipantsStatusNavbar from './ParticipantsStatusNavbar';
import YesNoPopup from '../../common/Popup/YesNoPopup';
import { ProUser } from '../../../model/user/ProUser';
import Popup from '../../common/Popup/Popup';
import CreateInvitations from '../../CreateMeeting/CreateInvitations';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';

export type MeetingParticipantsProps = {
  meetingId: number;
  isOrganizer: boolean;
  refreshParticipants: (value: number) => void;
  participants: ProUser[];
};

const MeetingParticipants = ({
  meetingId,
  isOrganizer,
  refreshParticipants,
  participants,
}: MeetingParticipantsProps) => {
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [invitations, setInvitations] = useState<InvitationDetails[]>([]);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());
  const [invitationsChanged, setInvitationsChanged] = useState<boolean>(false);
  const [state, setState] = useState<State>(State.ACCEPTED);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [addModalShow, setAddModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchMeetingInvitations(meetingId, setInvitations);
    // eslint-disable-next-line
  }, [invitationsChanged]);

  const deleteParticipant = (userId: number) => {
    removeUserFromMeeting(meetingId, userId);
    setDeleteModalShow(false);
    if (refreshParticipants) refreshParticipants(Math.random());
  };

  const sendInvitations = () => {
    createInvitations(
      {
        meetingId: meetingId,
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        message: 'Invitation message!',
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
              <UserNameIcon email={invitationDetails.user.email} />
            </div>
          </div>
          <hr className={styles.hrLine} />
        </div>
      );
    });
  };

  const acceptedInvitations = participants.map((participant: ProUser, index: number) => {
    return (
      <div key={index + State.ACCEPTED}>
        <div className={styles.participantRow}>
          <div className={styles.userNameIcon}>
            <UserNameIcon email={participant.email} />
          </div>
          {isOrganizer && (
            <div className={styles.deleteContainer}>
              <DeleteButton onDelete={() => setDeleteModalShow(true)} />
            </div>
          )}
          <YesNoPopup
            show={deleteModalShow}
            title={'Are you sure you want to remove the participant from the meeting?'}
            onDecline={() => setDeleteModalShow(false)}
            onAccept={() => deleteParticipant(participant.id)}
          />
        </div>
        <hr className={styles.hrLine} />
      </div>
    );
  });

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
    <Card title={'Who'} onAdd={() => setAddModalShow(true)}>
      <ParticipantsStatusNavbar
        accepted={acceptedInvitations.length}
        pending={pendingInvitations.length}
        rejected={rejectedInvitations.length}
        setState={setState}
        currentState={state}
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
