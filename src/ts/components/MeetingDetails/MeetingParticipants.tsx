import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProUser from '../../model/user/ProUser';
import UserIcon from './UserIcon';
import LineWithHeader from './LineWithHeader';

import './MeetingParticipants.css';
import CreateInvitations from '../CreateMeeting/CreateInvitations';
import allActions from '../../actions';
import { useDispatch } from 'react-redux';

interface IMeetingParticipants {
  participants: ProUser[];
  meetingId: number;
  isOrganizer: boolean;
}

const MeetingParticipants = ({ participants, meetingId, isOrganizer }: IMeetingParticipants) => {
  const dispatch: Function = useDispatch();

  useEffect(() => {
    dispatch(allActions.invitationActions.setMeetingIdInInvitations(meetingId));
    // eslint-disable-next-line
  }, []);

  const participantsIcons = participants.map((participant: ProUser) => {
    return (
      <Col lg={3} className="my-1 mx-auto text-center" key={participant.id}>
        <UserIcon
          name={'Jan Nowak'}
          meetingId={meetingId}
          userId={participant.id}
          canDelete={isOrganizer}
          fontBold={false}
          key={'Participant' + participant.id}
        />
      </Col>
    );
  });

  return (
    <Row className="justify-content mt-5 ml-5 pl-5">
      <LineWithHeader header={'Who'} />
      <Col lg={12} className="text-center mt-2 mb-5 meetingParticipantsTotalMembers">
        Total {participants.length} members
      </Col>
      {participantsIcons}
      {isOrganizer && (
        <Col lg={12}>
          <CreateInvitations showIcon={false} />
        </Col>
      )}
    </Row>
  );
};

export default MeetingParticipants;
