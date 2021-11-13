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
  loadNewMeetingChatMessages,
  MeetingChatDirection,
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
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  const [meetingSettings, setMeetingSettings] = useState<MeetingGeneralSettings>({
    onlyOrganizerCanInviteNewPeople: true,
  });
  const [chosenSection, setChosenSection] = useState<MeetingDetailsSection>(
    MeetingDetailsSection.About
  );

  const [meetingChatMessages, setMeetingChatMessages] = useState<MeetingChatMessageDetails[]>([]);
  const [oldestChatMessage, setOldestChatMessage] = useState<MeetingChatMessageDetails>();

  const setFinalPlace = (place: PlaceDetails) => {
    setMeeting({ ...meeting, finalPlace: place });
  };
  const setMeetingDetails = (meeting: any) => {
    setMeeting(meeting);
  };

  const reloadMeeting = () => {
    loadMeeting(id, setMeetingDetails, setMeetingResponse);
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

    let mounted = true;
    let chatLoaded = false;
    let lastMessage: MeetingChatMessageDetails | undefined = undefined;

    loadMeetingChatMessages(
      id,
      new Date().toISOString(),
      50,
      MeetingChatDirection.BEFORE,
      (messages: MeetingChatMessageDetails[]) => {
        setMeetingChatMessages(messages);
        lastMessage = messages[messages.length - 1];
        setOldestChatMessage(messages[0]);
        chatLoaded = true;
      }
    );

    const intervalId = setInterval(() => {
      console.log(`M: ${mounted}, L: ${chatLoaded}`);
      if (mounted && chatLoaded) {
        console.log(`dateTime: ${lastMessage?.creationDateTime}`);
        loadNewMeetingChatMessages(
          id,
          lastMessage?.creationDateTime ?? new Date().toISOString(),
          (messages: MeetingChatMessageDetails[]) => {
            console.log(`new messages: ${JSON.stringify(messages)}`);
            if (messages.length > 0) {
              setMeetingChatMessages((prevState: MeetingChatMessageDetails[]) =>
                prevState.concat(messages)
              );
              console.log(`new last: ${messages[messages.length - 1]}`);
              lastMessage = messages[messages.length - 1];
            }
          }
        );
      }
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
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
    reloadSurveySummary();
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
