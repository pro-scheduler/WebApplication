import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import actions from '../../actions/meetingActions';
import surveyActions from '../../actions/surveyActions';
import { ProUser } from '../../model/user/ProUser';
import { Meeting } from '../../model/meeting/Meeting';
import { SurveySummary, UserSurvey } from '../../model/survey/Survey';
import MeetingSurvey from '../../components/MeetingDetails/MeetingSurvey/MeetingSurvey';
import MeetingSurveyResults from '../../components/MeetingDetails/MeetingSurvey/MeetingSurveyResults';
import userActions from '../../actions/userActions';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  const meetingState = useSelector((state: RootStateOrAny) => {
    return state.meetings;
  });
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [refreshSurveySummary, setRefreshSurveySummary] = useState<number>(0);
  const [refreshParticipants, setRefreshParticipants] = useState<number>(0);

  useEffect(() => {
    dispatch(actions.loadMeeting(id));
    // eslint-disable-next-line
  }, [refreshParticipants]);

  useEffect(() => {
    // dispatch(actions.loadMeeting(id));
    dispatch(userActions.fetchUserOrganizedMeetings(user.id));
    surveyActions.getSurveyForMeeting(id).then(setSurvey);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setIsOrganizer(
      user.organizedMeetings.filter((meeting: Meeting) => meeting.id === parseInt(id)).pop() !==
        undefined
    );
    // eslint-disable-next-line
  }, [user.organizedMeetings]);

  useEffect(() => {
    surveyActions.getSurveySummary(id).then(setSurveySummary);
    // eslint-disable-next-line
  }, [survey, refreshSurveySummary]);

  return (
    <Container fluid className="ml-xs-5">
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
        isOrganizer={isOrganizer}
        refreshParticipants={setRefreshParticipants}
      />
      {meetingState.meeting.availableTimeRanges.length > 0 && (
        <MeetingTime meetingId={id} timeRanges={meetingState.meeting.availableTimeRanges} />
      )}
      {survey && (
        <MeetingSurvey survey={survey} setRefreshSurveySummary={setRefreshSurveySummary} />
      )}
      {surveySummary && isOrganizer && (
        <MeetingSurveyResults
          surveySummary={surveySummary}
          numberOfParticipants={meetingState.meeting.participants.length}
        />
      )}
    </Container>
  );
};

export default MeetingDetails;
