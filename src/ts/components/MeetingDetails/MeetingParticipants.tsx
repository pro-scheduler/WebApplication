import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ProUser } from '../../model/user/ProUser';
import UserIcon from './UserIcon';
import LineWithHeader from './LineWithHeader';
import styles from './MeetingParticipants.module.css';
import CreateInvitations from '../CreateMeeting/CreateInvitations';
import UserInvitationIcon from './UserInvitationIcon';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';
import { createInvitations } from '../../API/invitation/invitationService';
import { ApiCall } from '../../API/genericApiCalls';
import { fetchMeetingInvitations } from '../../API/invitation/invitationService';

export type MeetingParticipantsProps = {
  participants: ProUser[];
  meetingId: number;
  isOrganizer: boolean;
};

const MeetingParticipants = ({
  participants,
  meetingId,
  isOrganizer,
}: MeetingParticipantsProps) => {
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [invitations, setInvitations] = useState<BasicInvitationInfo[]>([]);
  const [saveResopnse, setSaveResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    fetchMeetingInvitations(meetingId, setInvitations);
    // eslint-disable-next-line
  }, []);

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
    if (saveResopnse.isSuccess) {
      setEmails([]);
    }
  }, [saveResopnse]);

  const participantsIcons = participants.map((participant: ProUser) => {
    return (
      <Col lg={3} className="my-1 mx-auto text-center" key={participant.id}>
        <UserIcon
          name={participant.email}
          meetingId={meetingId}
          userId={participant.id}
          canDelete={isOrganizer}
          key={'Participant' + participant.id}
        />
      </Col>
    );
  });

  const invitationsIcons = invitations.map((basicInvitationInfo: BasicInvitationInfo) => {
    return (
      <Col lg={3} className="my-1 mx-auto text-center" key={basicInvitationInfo.invitationId}>
        <UserInvitationIcon
          email={basicInvitationInfo.basicUserInfoDTO.email}
          state={basicInvitationInfo.state}
        />
      </Col>
    );
  });
  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <LineWithHeader header={'Who'} />
      <Col lg={12} className={styles.meetingParticipantsTotalMembers}>
        Total {participants.length} {participants.length === 1 ? 'member' : 'members'}
      </Col>
      {participantsIcons}
      {isOrganizer && (
        <>
          <Col lg={12} className={styles.meetingInvitations}>
            Invitations
          </Col>
          {invitationsIcons}
          <Col lg={12} className="text-center mx-auto">
            <CreateInvitations
              state="invitations"
              showIcon={false}
              emails={emails}
              setEmails={setEmails}
            />
            <ActionButton text="Invite" onclick={sendInvitations} className={styles.inviteButton} />
          </Col>
        </>
      )}
    </Row>
  );
};

export default MeetingParticipants;
