import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadMeeting } from '../../API/meeting/meetinService';
import surveyActions from '../../actions/surveyActions';
import { ProUser } from '../../model/user/ProUser';
import { Meeting } from '../../model/meeting/Meeting';
import { SurveySummary, UserSurvey } from '../../model/survey/Survey';
import MeetingSurvey from '../../components/MeetingDetails/MeetingSurvey/MeetingSurvey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import MeetingSurveyResults from '../../components/MeetingDetails/MeetingSurvey/MeetingSurveyResults';
import userActions from '../../actions/userActions';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  const [meetingResponse, setMettingResponse] = useState<ApiCall>(new ApiCall());
  const [meeting, setMeeting] = useState<any>();
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [refreshSurveySummary, setRefreshSurveySummary] = useState<number>(0);
  const [refreshParticipants, setRefreshParticipants] = useState<number>(0);

  useEffect(() => {
    loadMeeting(id, setMeeting, setMettingResponse);
    // eslint-disable-next-line
  }, [refreshParticipants]);

  useEffect(() => {
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

  return meeting ? (
    <div>
      <Container fluid className="ml-xs-5">
        <MeetingDescription
          name={meeting.name}
          meetingId={id}
          description={meeting.description}
          organizers={meeting.organizers}
          link={meeting.link}
          password={meeting.password}
        />
        <MeetingParticipants
          meetingId={id}
          participants={meeting.participants}
          isOrganizer={isOrganizer}
          refreshParticipants={setRefreshParticipants}
        />
        {meeting.availableTimeRanges.length > 0 && (
          <MeetingTime meetingId={id} timeRanges={meeting.availableTimeRanges} />
        )}
        {survey && (
          <MeetingSurvey survey={survey} setRefreshSurveySummary={setRefreshSurveySummary} />
        )}
        {surveySummary && isOrganizer && (
          <MeetingSurveyResults
            surveySummary={surveySummary}
            numberOfParticipants={meeting.participants.length}
          />
        )}
      </Container>
    </div>
  ) : (
    <LoadingSpinner acitve={meetingResponse.isLoading} />
  );
};

export default MeetingDetails;
