import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProUser from '../../model/ProUser';
import UserIcon from './UserIcon';
import LineWithHeader from './LineWithHeader';

import './MeetingParticipants.css';

interface IMeetingParticipants {
  participants: ProUser[];
  meetingId: number;
  canDelete: boolean;
}

const MeetingParticipants = (meeting: IMeetingParticipants) => {
  const participants = meeting.participants.map((participant: ProUser) => {
    return (
      <Col lg={3} className="my-1 mx-auto text-center" key={participant.id}>
        <UserIcon
          name={'Jan Nowak'}
          meetingId={meeting.meetingId}
          userId={participant.id}
          canDelete={meeting.canDelete}
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
        Total {meeting.participants.length} members
      </Col>
      {participants}
    </Row>
  );
};

export default MeetingParticipants;
