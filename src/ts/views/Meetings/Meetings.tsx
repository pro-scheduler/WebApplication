import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Header from '../../components/Meetings/Header';
import MeetingCard from '../../components/Meetings/MeetingCard';
import Meeting from '../../model/Meeting';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import ProUser from '../../model/ProUser';

const Meetings = () => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const dispatch: Function = useDispatch();

  useEffect(() => {
    dispatch(allActions.userActions.fetchUserOrganizedMeetings(user.userId));
    dispatch(allActions.userActions.fetchUserParticipatedMeetings(user.userId));
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
      <Header />
      <Row className="justify-content-center mt-4">{organizedMeetingsCard}</Row>
      <Row className="justify-content-center mt-4">{participatedMeetingsCard}</Row>
    </Container>
  );
};

export default Meetings;
