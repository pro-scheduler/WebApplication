import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import actions from '../../actions/meetingActions';
import { ProUser } from '../../model/user/ProUser';
import { Meeting } from '../../model/meeting/Meeting';

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
    dispatch(actions.loadMeeting(id));
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
        link={meetingState.meeting.link}
        password={meetingState.meeting.password}
      />
      <MeetingParticipants
        meetingId={id}
        participants={meetingState.meeting.participants}
        isOrganizer={
          user.organizedMeetings.filter((meeting: Meeting) => meeting.id === parseInt(id)).pop() !==
          undefined
        }
      />
      <MeetingTime meetingId={id} timeRanges={meetingState.meeting.availableTimeRanges} />
    </Container>
  );
};

export default MeetingDetails;
