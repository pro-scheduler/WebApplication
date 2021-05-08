import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProUser from '../../model/user/ProUser';
import UserIcon from './UserIcon';
import LineWithHeader from './LineWithHeader';

import './MeetingParticipants.css';
import CreateInvitations from '../CreateMeeting/CreateInvitations';
import allActions from '../../actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { BasicInvitationInfo } from '../../model/invitation/InvitationDTO';
import UserInvitationIcon from './UserInvitationIcon';

interface IMeetingParticipants {
  participants: ProUser[];
  meetingId: number;
  isOrganizer: boolean;
}

const MeetingParticipants = ({ participants, meetingId, isOrganizer }: IMeetingParticipants) => {
  const dispatch: Function = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => {
    return state.invitationReducer;
  });

  useEffect(() => {
    dispatch(allActions.invitationActions.setMeetingIdInInvitations(meetingId));
    dispatch(allActions.invitationActions.fetchMeetingInvitations(meetingId));
    // eslint-disable-next-line
  }, []);

  const participantsIcons = participants.map((participant: ProUser) => {
    return (
      <Col lg={3} className="my-1 mx-auto text-center" key={participant.id}>
        <UserIcon
          name={participant.email}
          meetingId={meetingId}
          userId={participant.id}
          canDelete={isOrganizer}
          fontBold={false}
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
      <Col lg={12} className="text-center mt-2 mb-5 meetingParticipantsTotalMembers">
        Total {participants.length} members
      </Col>
      {participantsIcons}
      {isOrganizer && (
        <>
          <Col lg={12} className="text-center mt-5 pt-5 mb-5 meetingParticipantsTotalMembers">
            Invitations
          </Col>
          {invitationsIcons}
          <Col lg={12}>
            <CreateInvitations showIcon={false} />
          </Col>
        </>
      )}
    </Row>
  );
};

export default MeetingParticipants;
