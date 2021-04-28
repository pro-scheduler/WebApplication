import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  const meetingState = useSelector((state: RootStateOrAny) => {
    return state.meetings;
  });

  useEffect(() => {
    dispatch(allActions.meetingActions.loadMeeting(id));
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <MeetingDescription
        name={meetingState.meeting.name}
        description={meetingState.meeting.description}
        organizers={meetingState.meeting.organizers}
      />
      <MeetingParticipants participants={meetingState.meeting.attendees} />
    </Container>
  );
};

export default MeetingDetails;
