import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ProUser } from '../../model/user/ProUser';
import UserIcon from './UserIcon';
import LineWithHeader from './LineWithHeader';
import styles from './MeetingParticipants.module.css';
import CreateInvitations from '../CreateMeeting/CreateInvitations';
import allActions from '../../actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import UserInvitationIcon from './UserInvitationIcon';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';

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
  const dispatch: Function = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => {
    return state.invitationReducer;
  });

  useEffect(() => {
    dispatch(allActions.invitationActions.setMeetingIdInInvitations(meetingId));
    dispatch(allActions.invitationActions.fetchMeetingInvitations(meetingId));
    // eslint-disable-next-line
  }, []);

  const sendInvitations = () => {
    allActions.invitationActions
      .createInvitations(meetingId, {
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
      })
      .then(() => setEmails([]));
  };

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

  const invitationsIcons = invitations.basicInvitationInfos.map(
    (basicInvitationInfo: BasicInvitationInfo) => {
      return (
        <Col lg={3} className="my-1 mx-auto text-center" key={basicInvitationInfo.invitationId}>
          <UserInvitationIcon
            email={basicInvitationInfo.basicUserInfoDTO.email}
            state={basicInvitationInfo.state}
          />
        </Col>
      );
    }
  );
  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <LineWithHeader header={'Who'} />
      <Col lg={12} className={styles.meetingParticipantsTotalMembers}>
        Total {participants.length} members
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
            <ActionButton
              text="Invite"
              onclick={sendInvitations}
              className="text-center mx-auto mt-5"
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default MeetingParticipants;
