import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { loadMeeting } from '../../API/meeting/meetingService';
import { ProUser } from '../../model/user/ProUser';
import { MeetingAttendeeDetails, MeetingRole } from '../../model/meeting/Meeting';
import { SurveySummary, UserSurvey } from '../../model/survey/Survey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import MeetingSurvey from '../../components/MeetingDetails/MeetingSurvey/MeetingSurvey';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { getSurveyForMeeting, getSurveySummary } from '../../API/survey/surveyService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MeetingDetailsInfo from '../../components/MeetingDetails/MeetingDetailsInfo';
import MeetingSettings from '../../components/MeetingDetails/MeetingSettings/MeetingSettings';
import FinalDateForm from '../../components/MeetingDetails/FinalDateForm/FinalDateForm';

const MeetingDetails = ({ user }: { user: ProUser }) => {
  const { id }: any = useParams();
  const [meetingResponse, setMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [meeting, setMeeting] = useState<any>();
  const [showSettings, setShowSettings] = useState<Boolean>(false);
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [refreshSurvey, setRefreshSurvey] = useState<number>(0);
  const [refreshSurveySummary, setRefreshSurveySummary] = useState<number>(0);
  const [refreshParticipants, setRefreshParticipants] = useState<number>(0);
  const [allUsersAnswers, setAllUsersAnswers] = useState<TimeRangeDTO[]>([]);
  const [userTimeAnswers, setUserTimeAnswers] = useState<TimeRangeDTO[]>([]);

  useEffect(() => {
    loadMeeting(id, setMeeting, setMeetingResponse);
    // eslint-disable-next-line
  }, [refreshParticipants]);

  const refreshTimeData = () => {
    if (meeting) {
      setAllUsersAnswers(
        meeting.attendees.flatMap((a: MeetingAttendeeDetails) => a.markedTimeRanges)
      );
      // TODO add user time answers
      setUserTimeAnswers([]);
    }
  };
  useEffect(() => {
    refreshTimeData();
    // eslint-disable-next-line
  }, [meeting]);

  useEffect(() => {
    getSurveyForMeeting(id, setSurvey);
  }, [id, refreshSurvey]);

  useEffect(() => {
    if (meeting)
      setIsOrganizer(
        meeting.attendees.some(
          (a: MeetingAttendeeDetails) =>
            parseInt(a.userId) === user.id && a.role === MeetingRole.ORGANIZER
        )
      );
  }, [meeting, user.id]);

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
          organizers={meeting.attendees.filter(
            (attendee: MeetingAttendeeDetails) => attendee.role === MeetingRole.ORGANIZER
          )}
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
                name={meeting.name}
                description={meeting.description}
                isOrganizer={isOrganizer}
                meetingId={meeting.id}
              />
            </Col>
            <Col lg={6}>
              <MeetingParticipants
                meetingId={id}
                isOrganizer={isOrganizer}
                refreshParticipants={setRefreshParticipants}
                participants={meeting.attendees}
              />
            </Col>
          </Row>
        )}
        {!showSettings && (
          // TODO connect with api
          <FinalDateForm meetingId={id} finalEndDate={new Date()} finalBeginDate={new Date()} />
        )}
        {meeting.availableTimeRanges.length > 0 && !showSettings && (
          <MeetingTime
            meetingId={id}
            timeRanges={meeting.availableTimeRanges}
            answers={allUsersAnswers}
            userRanges={userTimeAnswers}
            refreshTimeData={refreshTimeData}
            timeDeadline={new Date(meeting.markTimeRangeDeadline)}
            numberOfParticipants={meeting.attendees.length}
          />
        )}
        {survey && !showSettings && (
          <MeetingSurvey
            survey={survey}
            setRefreshSurveySummary={setRefreshSurveySummary}
            surveySummary={surveySummary}
            numberOfParticipants={meeting.attendees.length}
            isOrganizer={isOrganizer}
            setRefreshSurvey={setRefreshSurvey}
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
