import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './MeetingDescription.css';
import UserIcon from './UserIcon';
import ProUser from '../../model/ProUser';

interface IMeetingDescription {
  name: string;
  meetingId: number;
  organizers: ProUser[];
  description: string;
}

const MeetingDescription = (meeting: IMeetingDescription) => {
  const organizers = meeting.organizers.map((organizer: ProUser) => {
    return (
      <UserIcon
        name={'Jan Kowalski'}
        meetingId={meeting.meetingId}
        userId={organizer.id}
        canDelete={false}
        fontBold={true}
        key={'organizer' + organizer.id}
      />
    );
  });

  return (
    <Row className="justify-content mt-5 ml-5 pl-5">
      <Col lg={12} className="mb-2 meetingDescriptionName">
        {meeting.name}
      </Col>
      <Col lg={12} className="mt-5">
        <div className="meetingDescriptionOrganizer mr-3">Organizer</div>
        {organizers}
      </Col>
      <Col md={8} lg={6} xl={4} className="text-left mt-5">
        {meeting.description}
      </Col>
    </Row>
  );
};

export default MeetingDescription;
