import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { getMeetingSettings, loadMeeting } from '../../API/meeting/meetingService';
import { UserSummary } from '../../model/user/ProUser';
import {
  MeetingAttendeeDetails,
  MeetingRole,
  MeetingSettings as MeetingGeneralSettings,
  MeetingState,
} from '../../model/meeting/Meeting';
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
import MeetingDeclarations from '../../components/MeetingDetails/MeetingDeclarations/MeetingDeclarations';
import MeetingPlaces from '../../components/MeetingDetails/MeetingPlaces/MeetingPlaces';
import { getMeetingPlaces } from '../../API/geo/geo';
import { PlaceDetails } from '../../model/geo/Geo';
import {
  createNewMeetingChatMessage,
  loadMeetingChatMessages,
  subscribeToChat,
} from '../../API/meetingChat/meetingChatService';
import { MeetingChatMessageDetails } from '../../model/meetingChat/MeetingChatMessage';
import MeetingChat from '../../components/MeetingDetails/MeetingChat/MeetingChat';

const MeetingDetails = ({ user }: { user: UserSummary }) => {
  const { id }: any = useParams();
  const [userAttendeeId, setUserAttendeeId] = useState<number>(0);
  const [meetingResponse, setMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [meeting, setMeeting] = useState<any>();
  const [meetingChatMessages, setMeetingChatMessages] = useState<MeetingChatMessageDetails[]>([]);
  const [showSettings, setShowSettings] = useState<Boolean>(false);
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [allUsersAnswers, setAllUsersAnswers] = useState<TimeRangeDTO[]>([]);
  const [userTimeAnswers, setUserTimeAnswers] = useState<TimeRangeDTO[]>([]);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [meetingSettings, setMeetingSettings] = useState<MeetingGeneralSettings>({
    onlyOrganizerCanInviteNewPeople: true,
  });
  const setUser = (attendeeDetails: MeetingAttendeeDetails) => {
    const currentUser = meeting.attendees.find(
      (a: MeetingAttendeeDetails) => a.attendeeId === attendeeDetails.attendeeId
    );
    setMeeting({
      ...meeting,
      attendees: currentUser
        ? [
            ...meeting.attendees.filter(
              (a: MeetingAttendeeDetails) => a.attendeeId !== attendeeDetails.attendeeId
            ),
            {
              ...currentUser,
              markedTimeRanges: attendeeDetails.markedTimeRanges,
            },
          ]
        : [...meeting.attendees],
    });
  };
  const setMeetingNameAndDescription = (name: string, description: string) => {
    setMeeting({ ...meeting, name, description });
  };

  const setMeetingTimeDeadline = (deadline: Date) => {
    setMeeting({ ...meeting, markTimeRangeDeadline: deadline });
  };
  const setMeetingDetails = (meeting: any) => {
    setMeeting(meeting);
  };

  const reloadMeeting = () => {
    loadMeeting(id, setMeetingDetails, setMeetingResponse);
    loadMeetingChatMessages(id, 0, 50, setMeetingChatMessages);
    getMeetingSettings(id, setMeetingSettings);
  };

  const reloadSurvey = () => {
    getSurveyForMeeting(id, setSurvey);
  };

  const reloadSurveySummary = () => {
    getSurveySummary(id, setSurveySummary);
  };

  const sendNewMeetingChatMessage = (message: string) => {
    createNewMeetingChatMessage(id, { message: message });
  };

  const addMessageToChat = (newMessage: MeetingChatMessageDetails) => {
    setMeetingChatMessages((prevMeetingChatMessages) => prevMeetingChatMessages.concat(newMessage));
  };

  useEffect(() => {
    if (meeting && user.id) {
      setUserAttendeeId(meeting.attendees.find((a: any) => a.user.id === user.id).attendeeId);
    }
    // eslint-disable-next-line
  }, [meeting, user.id]);

  useEffect(() => {
    reloadMeeting();

    const chatWebSocket = subscribeToChat(id, (newMessage: MeetingChatMessageDetails) =>
      addMessageToChat(newMessage)
    );

    return () => {
      chatWebSocket.close();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (meeting && meeting.availableTimeRanges && user.id) {
      setAllUsersAnswers(
        meeting.attendees.flatMap((a: MeetingAttendeeDetails) => a.markedTimeRanges)
      );
      setUserTimeAnswers(
        meeting.attendees.find((a: any) => a.user.id === user.id).markedTimeRanges
      );
    }
    // eslint-disable-next-line
  }, [meeting]);

  useEffect(() => {
    reloadSurvey();
    getMeetingPlaces(id, setPlaces);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (meeting)
      setIsOrganizer(
        meeting.attendees.some(
          (a: MeetingAttendeeDetails) => a.user.id === user.id && a.role === MeetingRole.ORGANIZER
        )
      );
  }, [meeting, user.id]);

  useEffect(() => {
    reloadSurveySummary();
    // eslint-disable-next-line
  }, [survey]);

  return meeting ? (
    <Container fluid>
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
        state={meeting.state}
        attendees={meeting.attendees.filter(
          (attendee: MeetingAttendeeDetails) => attendee.role === MeetingRole.ATTENDEE
        )}
        reloadMeeting={reloadMeeting}
      />
      {showSettings && (
        <MeetingSettings
          survey={survey}
          meetingId={parseInt(id)}
          meetingName={meeting.name}
          markTimeRangeDeadline={meeting.markTimeRangeDeadline}
          meetingFinalDate={meeting.finalDate}
          showPlacesSettings={places.length > 0}
        />
      )}
      {!showSettings && (
        <Row className="justify-content">
          <Col lg={6}>
            <MeetingDetailsInfo
              hasDeclarations={false}
              hasSurvey={survey !== undefined}
              meetingLink={meeting.link}
              meetingPassword={meeting.password}
              finalPlace={undefined} // TODO replace by final place
              name={meeting.name}
              description={meeting.description}
              isOrganizer={isOrganizer}
              meetingId={meeting.id}
              state={meeting.state}
              refreshMeeting={reloadMeeting}
              refreshNameAndDescription={setMeetingNameAndDescription}
              finalEndDate={meeting.finalDate ? new Date(meeting.finalDate.timeEnd) : null}
              finalBeginDate={meeting.finalDate ? new Date(meeting.finalDate.timeStart) : null}
            />
          </Col>
          <Col lg={6}>
            <MeetingParticipants
              meetingId={id}
              isOrganizer={isOrganizer}
              refreshParticipants={reloadMeeting}
              participants={meeting.attendees}
              state={meeting.state}
              everybodyCanInvite={!meetingSettings.onlyOrganizerCanInviteNewPeople}
            />
          </Col>
        </Row>
      )}
      <MeetingChat
        messages={meetingChatMessages}
        onSendNewMessage={sendNewMeetingChatMessage}
        userId={user.id}
      />
      {meeting.availableTimeRanges.length > 0 && !showSettings && (
        <MeetingTime
          meetingId={id}
          attendeeId={userAttendeeId}
          timeRanges={meeting.availableTimeRanges}
          answers={allUsersAnswers}
          userRanges={userTimeAnswers}
          setUser={setUser}
          timeDeadline={meeting.markTimeRangeDeadline}
          numberOfParticipants={meeting.attendees.length}
          isOrganizer={isOrganizer}
          state={meeting.state}
          setNewDeadline={setMeetingTimeDeadline}
        />
      )}
      {survey && !showSettings && (
        <MeetingSurvey
          survey={survey}
          reloadSurveySummary={reloadSurveySummary}
          surveySummary={surveySummary}
          numberOfParticipants={meeting.attendees.length}
          isOrganizer={isOrganizer}
          reloadSurvey={reloadSurvey}
          state={meeting.state}
        />
      )}
      {!showSettings && (
        <MeetingDeclarations
          meetingId={id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
        />
      )}
      {places.length > 0 && !showSettings && (
        <MeetingPlaces
          meetingId={id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
          places={places}
          setPlaces={setPlaces}
        />
      )}
    </Container>
  ) : (
    <Container fluid>
      <Row className="justify-content-center mt-4 mb-5">
        <Col className="text-center mt-5">
          <LoadingSpinner active={meetingResponse.isLoading} />
        </Col>
      </Row>
    </Container>
  );
};

export default MeetingDetails;
