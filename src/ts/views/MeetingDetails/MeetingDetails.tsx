import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  loadMeeting,
  getAllUsersTimeAnswers,
  getUserTimeAnswers,
} from '../../API/meeting/meetingService';
import { ProUser } from '../../model/user/ProUser';
import { Meeting } from '../../model/meeting/Meeting';
import { SurveySummary, UserSurvey } from '../../model/survey/Survey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import allActions from '../../actions';
import MeetingSurvey from '../../components/MeetingDetails/MeetingSurvey/MeetingSurvey';
import { MeetingTimeSummary } from '../../model/meeting/MeetingTimeSummary';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { getSurveyForMeeting, getSurveySummary } from '../../API/survey/surveyService';
import { loadUserOrganizedMeetings } from '../../API/user/userService';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  const [meetingResponse, setMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [meeting, setMeeting] = useState<any>();
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [organizedMeetings, setOrganizedMeetings] = useState<Meeting[]>([]);
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [refreshSurveySummary, setRefreshSurveySummary] = useState<number>(0);
  const [refreshParticipants, setRefreshParticipants] = useState<number>(0);
  const [allUsersAnswers, setAllUsersAnswers] = useState<MeetingTimeSummary>({
    availableTimeRanges: [],
    timeRangesEnteredByAllUsers: [],
  });
  const [userTimeAnswers, setUserTimeAnswers] = useState<TimeRangeDTO[]>([]);
  useEffect(() => {
    loadMeeting(id, setMeeting, setMeetingResponse);
    // eslint-disable-next-line
  }, [refreshParticipants]);

  const refreshTimeData = () => {
    getAllUsersTimeAnswers(id, setAllUsersAnswers);
    getUserTimeAnswers(id, setUserTimeAnswers);
  };

  useEffect(() => {
    dispatch(allActions.userActions.fetchCurrentUser());
    getSurveyForMeeting(id, setSurvey);
    refreshTimeData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUserOrganizedMeetings(user.id, setOrganizedMeetings);
    // eslint-disable-next-line
  }, [user.id]);

  useEffect(() => {
    setIsOrganizer(
      organizedMeetings.filter((meeting: Meeting) => meeting.id === parseInt(id)).pop() !==
        undefined
    );
    // eslint-disable-next-line
  }, [organizedMeetings]);

  useEffect(() => {
    getSurveySummary(id, setSurveySummary);
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
          <MeetingTime
            meetingId={id}
            timeRanges={meeting.availableTimeRanges}
            answers={allUsersAnswers.timeRangesEnteredByAllUsers}
            userRanges={userTimeAnswers}
            refreshTimeData={refreshTimeData}
          />
        )}
        {survey && (
          <MeetingSurvey
            survey={survey}
            setRefreshSurveySummary={setRefreshSurveySummary}
            surveySummary={surveySummary}
            numberOfParticipants={meeting.participants.length}
          />
        )}
      </Container>
    </div>
  ) : (
    <LoadingSpinner active={meetingResponse.isLoading} />
  );
};

export default MeetingDetails;
