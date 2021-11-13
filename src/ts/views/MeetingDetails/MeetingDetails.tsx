import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import { getMeetingSettings, loadMeeting } from '../../API/meeting/meetingService';
import { UserSummary } from '../../model/user/ProUser';
import {
  MeetingAttendeeDetails,
  MeetingRole,
  MeetingSettings as MeetingGeneralSettings,
} from '../../model/meeting/Meeting';
import { SurveySummary, UserSurvey } from '../../model/survey/Survey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import { getSurveyForMeeting, getSurveySummary } from '../../API/survey/surveyService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getMeetingPlaces } from '../../API/geo/geo';
import { PlaceDetails } from '../../model/geo/Geo';
import {
  createNewMeetingChatMessage,
  loadMeetingChatMessages,
  subscribeToChat,
} from '../../API/meetingChat/meetingChatService';
import { MeetingChatMessageDetails } from '../../model/meetingChat/MeetingChatMessage';
import MeetingChat from '../../components/MeetingDetails/MeetingChat/MeetingChat';
import MeetingDetailsHeader from '../../components/MeetingDetails/MeetingDetailsHeader/MeetingDetailsHeader';
import MeetingDetailsSectionAbout from '../../components/MeetingDetails/MeetingDetailsSectionAbout/MeetingDetailsSectionAbout';
import MeetingDetailsSectionTime from '../../components/MeetingDetails/MeetingDetailsSectionTime/MeetingDetailsSectionTime';
import MeetingDetailsSectionPlace from '../../components/MeetingDetails/MeetingDetailsSectionPlace/MeetingDetailsSectionPlace';
import MeetingDetailsSectionSurvey from '../../components/MeetingDetails/MeetingDetailsSectionSurvey/MeetingDetailsSectionSurvey';
import MeetingDetailsSectionDeclarations from '../../components/MeetingDetails/MeetingDetailsSectionDeclarations/MeetingDetailsSectionDeclarations';
import MeetingDetailsSectionSettings from '../../components/MeetingDetails/MeetingDetailsSectionSettings/MeetingDetailsSectionSettings';
import { DeclarationDetails } from '../../model/declaration/Declaration';
import { loadMeetingDeclarations } from '../../API/declarations/declarationsService';

export enum MeetingDetailsSection {
  About,
  Time,
  Place,
  Survey,
  Declarations,
  Settings,
}

export type MeetingDetailsSectionChoiceFunction = (chosenSection: MeetingDetailsSection) => void;

export type MeetingChangeFunction = (updatedMeeting: any) => void;
export type MeetingPlacesChangeFunction = (updatedPlaces: PlaceDetails[]) => void;

const MeetingDetails = ({ user }: { user: UserSummary }) => {
  const { id }: any = useParams();
  const [meetingResponse, setMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [meeting, setMeeting] = useState<any>();
  const [meetingChatMessages, setMeetingChatMessages] = useState<MeetingChatMessageDetails[]>([]);
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  const [meetingSettings, setMeetingSettings] = useState<MeetingGeneralSettings>({
    participantsCanInvitePeople: false,
    participantsCanSeeResults: false,
  });
  const [chosenSection, setChosenSection] = useState<MeetingDetailsSection>(
    MeetingDetailsSection.About
  );

  const setFinalPlace = (place: PlaceDetails) => {
    setMeeting({ ...meeting, finalPlace: place });
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
    if (isOrganizer || meetingSettings.participantsCanSeeResults) {
      reloadSurveySummary();
    }
    // eslint-disable-next-line
  }, [survey]);

  useEffect(() => {
    if (id) {
      loadMeetingDeclarations(id, setDeclarations, () => {});
    }
  }, [id]);

  return meeting ? (
    <Container fluid>
      <MeetingDetailsHeader
        meeting={meeting}
        chosenSection={chosenSection}
        onMeetingSectionChosen={(chosenSection) => setChosenSection(chosenSection)}
        isOrganizer={isOrganizer}
      />
      {chosenSection === MeetingDetailsSection.About && (
        <MeetingDetailsSectionAbout
          meeting={meeting}
          isOrganizer={isOrganizer}
          meetingSettings={meetingSettings}
          onMeetingChange={() => reloadMeeting()}
        />
      )}
      {chosenSection === MeetingDetailsSection.Time && meeting?.availableTimeRanges.length > 0 && (
        <MeetingDetailsSectionTime
          meeting={meeting}
          isOrganizer={isOrganizer}
          user={user}
          onMeetingChange={(updatedMeeting) => setMeeting(updatedMeeting)}
          canSeeVotingResults={isOrganizer || meetingSettings.participantsCanSeeResults}
        />
      )}
      {chosenSection === MeetingDetailsSection.Place && (
        <MeetingDetailsSectionPlace
          meeting={meeting}
          isOrganizer={isOrganizer}
          user={user}
          places={places}
          onPlacesChange={(updatedPlaces) => setPlaces(updatedPlaces)}
          finalPlaceId={meeting.finalPlace ? meeting.finalPlace.id : -1}
          setFinalPlace={setFinalPlace}
          canSeeVotingResults={isOrganizer || meetingSettings.participantsCanSeeResults}
        />
      )}
      {survey && chosenSection === MeetingDetailsSection.Survey && (
        <MeetingDetailsSectionSurvey
          meeting={meeting}
          isOrganizer={isOrganizer}
          survey={survey}
          surveySummary={surveySummary}
          onSurveyReload={reloadSurvey}
          onSurveySummaryReload={reloadSurveySummary}
        />
      )}
      {chosenSection === MeetingDetailsSection.Declarations && (
        <MeetingDetailsSectionDeclarations
          meeting={meeting}
          user={user}
          isOrganizer={isOrganizer}
          declarations={declarations}
          setDeclarations={setDeclarations}
        />
      )}
      {chosenSection === MeetingDetailsSection.Settings && (
        <MeetingDetailsSectionSettings meeting={meeting} survey={survey} places={places} />
      )}
      <MeetingChat
        messages={meetingChatMessages}
        onSendNewMessage={sendNewMeetingChatMessage}
        userId={user.id}
      />
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
