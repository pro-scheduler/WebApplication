import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MeetingCard from '../../components/Meetings/MeetingCard';
import Meeting from '../../model/Meeting';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import ProUser from '../../model/ProUser';
import './Meetings.css';
import CalendarIcon from '../../components/common/Icons/CalendarIcon';

const Meetings = () => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const dispatch: Function = useDispatch();

  useEffect(() => {
    dispatch(allActions.userActions.fetchUserOrganizedMeetings(user.id));
    dispatch(allActions.userActions.fetchUserParticipatedMeetings(user.id));
    // eslint-disable-next-line
  }, []);

  const organizedMeetingsCard = user.organizedMeetings.map((meeting: Meeting) => {
    return <MeetingCard key={meeting.name} {...meeting} />;
  });

  const participatedMeetingsCard = user.participatedMeetings.map((meeting: Meeting) => {
    return <MeetingCard key={meeting.name} {...meeting} />;
  });

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4 mx-auto">
        <Col lg={12} className="text-center mt-5">
          <CalendarIcon className="meetingsIcon" />
        </Col>
        <Col lg={12} className="text-center mt-3 meetingHeader">
          Meetings you organize
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 row">{organizedMeetingsCard}</Row>
      <Row className="justify-content-center mt-4 mx-auto">
        <Col lg={12} className="text-center mt-5">
          <CalendarIcon className="meetingsIcon" />
        </Col>
        <Col lg={12} className="text-center mt-3 meetingHeader">
          Meetings you participate in
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mr-5 row">{participatedMeetingsCard}</Row>
    </Container>
  );
};

export default Meetings;
