import { useEffect, useState } from 'react';
import styles from './MeetingParticipants.module.css';
import UserNameIcon from '../../common/Icons/UserNameIcon';
import {
  CreateInvitationsResponse,
  FailedInvitationDetails,
  InvitationDetails,
  State,
} from '../../../model/invitation/Invitation';
import { ValueLabelPair } from '../../../model/utils/ValueLabelPair';
import {
  createInvitations,
  fetchMeetingInvitations,
} from '../../../API/invitation/invitationService';
import { ApiCall } from '../../../API/genericApiCalls';
import Card from '../../common/Card/Card';
import DeleteButton from '../../common/SubmitButton/ActionButton/DeleteButton';
import {
  generateSharedMeetingEndpoint,
  removeAttendeeFromMeeting,
} from '../../../API/meeting/meetingService';
import ParticipantsStatusNavbar from './ParticipantsStatusNavbar';
import Popup from '../../common/Popup/Popup';
import CreateInvitations from '../../CreateMeeting/CreateInvitations';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import {
  MeetingAttendeeDetails,
  MeetingState,
  SharedMeetingDetails,
} from '../../../model/meeting/Meeting';
import { MdContentCopy } from 'react-icons/md';
import { toastError, toastSuccess } from '../../../tools/messagesInvocator';

export type MeetingParticipantsProps = {
  meetingId: number;
  isOrganizer: boolean;
  everybodyCanInvite: boolean;
  refreshParticipants: Function;
  participants: MeetingAttendeeDetails[];
  state: MeetingState;
  currentUserId: number;
};

const MeetingParticipants = ({
  meetingId,
  isOrganizer,
  refreshParticipants,
  participants,
  state,
  everybodyCanInvite,
  currentUserId,
}: MeetingParticipantsProps) => {
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [invitationMessage, setInvitationMessage] = useState<string>('');
  const [invitations, setInvitations] = useState<InvitationDetails[]>([]);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());
  const [invitationsResponse, setInvitationsResponse] = useState<CreateInvitationsResponse>();
  const [invitationsChanged, setInvitationsChanged] = useState<boolean>(false);
  const [invitationState, setInvitationState] = useState<State>(State.ACCEPTED);
  const [addModalShow, setAddModalShow] = useState<boolean>(false);
  const [sharedMeetingDetails, setSharedMeetingDetails] = useState<SharedMeetingDetails>();
  const [showInvitationLink, setShowInvitationLink] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    fetchMeetingInvitations(meetingId, setInvitations);
    // eslint-disable-next-line
  }, [invitationsChanged]);

  useEffect(() => {
    if (sharedMeetingDetails) {
      setLink(window.location.origin + '/join/' + sharedMeetingDetails?.generatedEndpoint);
    }
  }, [sharedMeetingDetails]);

  useEffect(() => {
    if (invitationsResponse) {
      if (invitationsResponse.createdInvitations.length > 0) {
        const createdInvitationsEmails: string = invitationsResponse.createdInvitations
          .map((invitationDetails: InvitationDetails) => invitationDetails.user.email)
          .reduce((result: string, value: string) => result + ' ' + value);
        toastSuccess(
          'Invitations for ' + createdInvitationsEmails + ' have been send successfully'
        );
      }
      invitationsResponse.failedInvitationDetails.forEach(
        (failedInvitation: FailedInvitationDetails) => toastError(failedInvitation.cause)
      );
    }
  }, [invitationsResponse]);

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
      setSaveResponse,
      setInvitationsResponse
    );
    setAddModalShow(false);
  };

  const generateInvitationLink = () => {
    generateSharedMeetingEndpoint(meetingId, setSharedMeetingDetails, () =>
      setShowInvitationLink(true)
    );
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
              <UserNameIcon user={invitationDetails.user} email={invitationDetails.user.username} />
            </div>
          </div>
          <hr className={styles.hrLine} />
        </div>
      );
    });
  };

  const acceptedInvitations = participants.map((participant: MeetingAttendeeDetails) => {
    return (
      <div key={participant.attendeeId}>
        <div className={styles.participantRow}>
          <div className={styles.userNameIcon}>
            <UserNameIcon user={participant.user} email={participant.user.username} />
          </div>
          {isOrganizer && state === MeetingState.OPEN && currentUserId !== participant.user.id && (
            <div className={styles.deleteContainer}>
              <DeleteButton onDelete={() => deleteParticipant(participant.attendeeId)} />
            </div>
          )}
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

  const closeInvitationLinkPopup = () => {
    setShowInvitationLink(false);
    setLinkCopied(false);
  };

  const copy = async () => {
    setLinkCopied(!linkCopied);
    await navigator.clipboard.writeText(link);
  };

  return (
    <Card
      title={'Who'}
      onAdd={
        (isOrganizer || everybodyCanInvite) && state === MeetingState.OPEN
          ? () => setAddModalShow(true)
          : undefined
      }
      footer={
        (isOrganizer || everybodyCanInvite) && state === MeetingState.OPEN ? (
          <div className={styles.actionButtonContainer}>
            <ActionButton
              onclick={generateInvitationLink}
              text={'Generate invitation link'}
              className={styles.actionButton}
            />
          </div>
        ) : undefined
      }
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
          visible={true}
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
      <Popup
        show={showInvitationLink && sharedMeetingDetails !== undefined}
        title={'Invitation link'}
        onClose={closeInvitationLinkPopup}
      >
        <div>Copy the below link and send it to others</div>
        <div className="mt-4 mb-2" style={{ position: 'relative' }}>
          <a href={link}>{link}</a>
          <MdContentCopy className={styles.copyIcon} onClick={copy} />
          {linkCopied && <div className={styles.copiedToClipboardMessage}>Copied to clipboard</div>}
        </div>
      </Popup>
    </Card>
  );
};

export default MeetingParticipants;
