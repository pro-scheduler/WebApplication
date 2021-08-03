import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants/MeetingParticipants';
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
import MeetingSurvey from '../../components/MeetingDetails/MeetingSurvey/MeetingSurvey';
import { MeetingTimeSummary } from '../../model/meeting/MeetingTimeSummary';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { getSurveyForMeeting, getSurveySummary } from '../../API/survey/surveyService';
import { loadUserOrganizedMeetings } from '../../API/user/userService';
import userActions from '../../actions/userActions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MeetingDetailsInfo from '../../components/MeetingDetails/MeetingDetailsInfo';
import MeetingSettings from '../../components/MeetingDetails/MeetingSettings/MeetingSettings';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  const [meetingResponse, setMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [meeting, setMeeting] = useState<any>();
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [showSettings, setShowSettings] = useState<Boolean>(false);
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
    dispatch(userActions.fetchCurrentUser());
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
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          isOrganizer={isOrganizer}
        />
        {showSettings && <MeetingSettings survey={survey} />}
        {!showSettings && (
          <Row className="justify-content ml-5 pl-5">
            <Col lg={6}>
              <MeetingDetailsInfo
                hasDeclarations={false}
                hasSurvey={survey !== undefined}
                hasTime={meeting.availableTimeRanges.length > 0}
                meetingLink={meeting.link}
                meetingPassword={meeting.password}
              />
            </Col>
            <Col lg={6}>
              <MeetingParticipants
                meetingId={id}
                isOrganizer={isOrganizer}
                refreshParticipants={setRefreshParticipants}
                participants={meeting.participants}
              />
            </Col>
          </Row>
        )}
        {meeting.availableTimeRanges.length > 0 && !showSettings && (
          <MeetingTime
            meetingId={id}
            timeRanges={meeting.availableTimeRanges}
            answers={allUsersAnswers.timeRangesEnteredByAllUsers}
            userRanges={userTimeAnswers}
            refreshTimeData={refreshTimeData}
            // meeting.timeDeadline here ( change '+' for '-' to check expiration time message)
            timeDeadline={new Date(new Date().getTime() + 60 * 60 * 60 * 1000)}
            numberOfParticipants={meeting.participants.length}
          />
        )}
        {survey && !showSettings && (
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
    <Container fluid className="ml-xs-5">
      <Row className="justify-content-center mt-4 mb-5 mr-5" style={{ marginLeft: '6%' }}>
        <Col className="text-center mt-5">
          <LoadingSpinner active={meetingResponse.isLoading} />
        </Col>
      </Row>
    </Container>
  );
};

export default MeetingDetails;
