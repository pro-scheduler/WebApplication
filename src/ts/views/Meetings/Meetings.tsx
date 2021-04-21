import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../../components/Meetings/Header';
import MeetingCard from '../../components/Meetings/MeetingCard';
import Meeting from '../../model/Meeting';

const meetings: Meeting[] = [];
meetings.push({
  name: 'Meet Joe',
  description: 'Learn with Joe on math test',
  meetingId: 0,
  availableTimeRanges: [],
});
meetings.push({
  name: 'Standup',
  description: 'Very interesting Standup',
  meetingId: 1,
  availableTimeRanges: [],
});
meetings.push({
  name: 'Meet Martin',
  description: 'Party at restaurant with Martin',
  meetingId: 2,
  availableTimeRanges: [],
});
meetings.push({
  name: 'Onboarding',
  description: 'Onboarding to my new job',
  meetingId: 3,
  availableTimeRanges: [],
});

const Meetings = () => {
  const meetingsCard = meetings.map((meeting: Meeting) => {
    return <MeetingCard {...meeting} />;
  });

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Header />
      <Row className="justify-content-center mt-4">{meetingsCard}</Row>
    </Container>
  );
};

export default Meetings;
