import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NameAndDescription from '../../components/CreateMeeting/NameAndDescription';
import CreateSurvey from '../../components/CreateSurvey/CreateSurvey';
import CreateInvitations from '../../components/CreateMeeting/CreateInvitations';
import ChooseTime from '../../components/CreateMeeting/ChooseTime';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';
import OnlineDetails from '../../components/CreateMeeting/OnlineDetails';
import { required } from '../../tools/validator';
import {
  MeetingDetailsDTO,
  OnlineMeetingDetailsDTO,
  RealMeetingDetailsDTO,
} from '../../model/meeting/Meeting';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import MeetingNavbar from '../../components/CreateMeeting/MeetingNavbar';
import styles from './CreateMeeting.module.css';
import { saveMeeting } from '../../API/meeting/meetingService';
import { ApiCall } from '../../API/genericApiCalls';
import { createInvitations } from '../../API/invitation/invitationService';
import { createSurvey } from '../../API/survey/surveyService';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import { useHistory } from 'react-router';
import ChooseModules from '../../components/CreateMeeting/ChooseModules';
import { FaQuestionCircle } from 'react-icons/fa';
export type creatingMeetingState =
  | 'modules'
  | 'name'
  | 'time'
  | 'invitations'
  | 'place'
  | 'survey'
  | 'summary';

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);
  // eslint-disable-next-line
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);
  const history = useHistory();
  const [meetingId, setMeetingId] = useState<{ id: number | undefined }>({ id: undefined });
  const [saveMeetingResponse, setSaveMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [saveInvitationsResponse, setSetInvitationsResponse] = useState<ApiCall>(new ApiCall());
  const [saveSurveyResponse, setSaveSurveyResponse] = useState<ApiCall>(new ApiCall());
  const [survey, setSurvey] = useState<SurveyWithQuestionsDTO>({
    description: '',
    meetingId: -1,
    questions: [],
  });

  const [state, setState] = useState<creatingMeetingState>('modules');

  const [surveyModule, setSurveyModule] = useState<boolean>(false);
  const [timeModule, setTimeModule] = useState<boolean>(false);
  const [placeModule, setPlaceModule] = useState<boolean>(false);

  const [showNavbarLegend, setShowNavbarLegend] = useState<boolean>(false);

  const saveThisMeeting = () => {
    // need add deadlineDate here
    const meeting: MeetingDetailsDTO =
      onlineLink === ''
        ? new RealMeetingDetailsDTO(name, description, timeRanges)
        : new OnlineMeetingDetailsDTO(name, description, timeRanges, onlineLink, onlinePassword);
    saveMeeting(meeting, setMeetingId, setSaveMeetingResponse, 'Meeting created successfully');
  };

  useEffect(() => {
    if (meetingId.id !== undefined && saveMeetingResponse.isSuccess) {
      const invitations = {
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
      };
      if (invitations.emails.length > 0) {
        createInvitations(meetingId.id, invitations, setSetInvitationsResponse);
      }
      if (survey.questions.length > 0) {
        createSurvey(meetingId.id, survey, setSaveSurveyResponse);
      }
      setSaveMeetingResponse({ ...saveMeetingResponse, isSuccess: false });
      history.push('/meetings/' + meetingId.id);
    }
    // eslint-disable-next-line
  }, [meetingId.id]);

  return (
    <Container className="ml-5 ml-sm-auto">
      {state !== 'modules' && (
        <MeetingNavbar
          state={state}
          setState={setState}
          disabledSummary={invalidNameDesc || !required()(name)}
          surveyModule={surveyModule}
          timeModule={timeModule}
          placeModule={placeModule}
          nameFilled={name.length >= 5}
          participantsFilled={emails.length > 0}
          surveyFilled={survey.questions.length > 0}
          timeFilled={timeRanges.length > 0}
          placeFilled={onlineLink !== ''}
        />
      )}
      {state === 'modules' && (
        <ChooseModules
          showModules={() => setState('name')}
          surveyModule={surveyModule}
          timeModule={timeModule}
          placeModule={placeModule}
          setSurveyModule={setSurveyModule}
          setTimeModule={setTimeModule}
          setPlaceModule={setPlaceModule}
        />
      )}
      <NameAndDescription
        state={state}
        setName={setName}
        setDescription={setDescription}
        setInvalidNameDesc={setInvalidNameDesc}
      />
      <ChooseTime
        state={state}
        setSelectedRanges={setTimeRanges}
        setDeadlineDate={setDeadlineDate}
      />
      <CreateInvitations state={state} showIcon={true} emails={emails} setEmails={setEmails} />
      <OnlineDetails
        state={state}
        onlineLink={onlineLink}
        setOnlineLink={setOnlineLink}
        setOnlinePassword={setOnlinePassword}
      />
      <CreateSurvey survey={survey} setSurvey={setSurvey} state={state} />
      {state === 'summary' && (
        <>
          <Row className="justify-content-center mt-4 ml-sm-5">
            <Col>
              <hr className={styles.hrLine} />
            </Col>
          </Row>

          <Row className="justify-content-center mt-5 mb-4">
            <Col xs="auto">
              <ActionButton
                text="Create meeting"
                onclick={saveThisMeeting}
                disabled={invalidNameDesc || !required()(name)}
                className={styles.saveMeetingButton}
              />
            </Col>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-2">
        <Col xs="auto">
          <LoadingSpinner
            active={
              saveMeetingResponse.isLoading ||
              saveInvitationsResponse.isLoading ||
              saveSurveyResponse.isLoading
            }
          />
        </Col>
      </Row>
      {showNavbarLegend && (
        <div className={styles.navbarLegend}>
          To navigate between different modules, click on the module name in the navbar.
        </div>
      )}
      {state !== 'modules' && (
        <FaQuestionCircle
          onMouseEnter={() => setShowNavbarLegend(true)}
          onMouseLeave={() => setShowNavbarLegend(false)}
          className={styles.legendIcon}
        />
      )}
    </Container>
  );
};

export default CreateMeeting;
