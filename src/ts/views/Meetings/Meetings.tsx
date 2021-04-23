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
import RedirectButton from '../../components/common/SubmitButton/RedirectButton/RedirectButton';

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
      <Row className="justify-content-center mt-4 mr-5 row">
        <Col lg={12} className="text-center mt-5">
          <CalendarIcon className="meetingsIcon" />
        </Col>
        <Col lg={12} className="text-center my-3 meetingHeader">
          Meetings you organize
        </Col>
        {user.organizedMeetings.length > 0 ? (
          <>{organizedMeetingsCard}</>
        ) : (
          <div className="text-center mt-5">
            <div>You don't organize any meeting</div>
            <RedirectButton className="mt-4" redirectTO="/create" text="Add new meeting" />
          </div>
        )}
      </Row>

      <Row className="justify-content-center mt-4 mr-5 row">
        <Col lg={12} className="text-center mt-5">
          <CalendarIcon className="meetingsIcon" />
        </Col>
        <Col lg={12} className="text-center my-3 meetingHeader">
          Meetings you participate in
        </Col>
        {user.participatedMeetings.length > 0 ? (
          <>{participatedMeetingsCard}</>
        ) : (
          <div className="text-center mt-5">
            <div>You don't participate in any meeting</div>
            <RedirectButton className="mt-4" redirectTO="/create" text="Add new meeting" />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Meetings;
