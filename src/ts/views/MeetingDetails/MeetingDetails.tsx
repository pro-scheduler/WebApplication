import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import ProUser from '../../model/ProUser';
import Meeting from '../../model/meeting/Meeting';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  const meetingState = useSelector((state: RootStateOrAny) => {
    return state.meetings;
  });
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });

  useEffect(() => {
    dispatch(allActions.meetingActions.loadMeeting(id));
    dispatch(allActions.userActions.fetchUserOrganizedMeetings(user.id));
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <MeetingDescription
        name={meetingState.meeting.name}
        meetingId={id}
        description={meetingState.meeting.description}
        organizers={meetingState.meeting.organizers}
      />
      <MeetingParticipants
        meetingId={id}
        participants={meetingState.meeting.participants}
        canDelete={
          user.organizedMeetings.filter((meeting: Meeting) => meeting.id === parseInt(id)).pop() !==
          undefined
        }
      />
    </Container>
  );
};

export default MeetingDetails;
