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
import RightArrowButton from '../../components/common/NextButton/RightArrowButton';
import LeftArrowButton from '../../components/common/NextButton/LeftArrowButton';
import { CreateMeetingRequest, MeetingType } from '../../model/meeting/Meeting';
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
  const [invitationMessage, setInvitationMessage] = useState<string>('');
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);
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
  const [modules, setModules] = useState<creatingMeetingState[]>(['name', 'invitations']);

  const getCreatedMeetingType = () => {
    return onlineLink === '' ? MeetingType.REAL : MeetingType.ONLINE;
  };

  const saveThisMeeting = () => {
    const createRequest: CreateMeetingRequest = {
      name: name,
      description: description,
      type: getCreatedMeetingType(),
      availableTimeRanges: timeRanges,
      markTimeRangeDeadline: deadlineDate,
      link: onlineLink,
      password: onlinePassword,
    };
    saveMeeting(
      createRequest,
      setMeetingId,
      setSaveMeetingResponse,
      'Meeting created successfully'
    );
  };

  const showModules = () => {
    setState('name');
    if (timeModule) {
      modules.push('time');
    }
    if (placeModule) {
      modules.push('place');
    }
    if (surveyModule) {
      modules.push('survey');
    }
    modules.push('summary');
    setModules(modules);
  };

  useEffect(() => {
    if (meetingId.id !== undefined && saveMeetingResponse.isSuccess) {
      const createInvitationsRequest = {
        meetingId: meetingId.id,
        emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        message: invitationMessage,
      };
      if (createInvitationsRequest.emails.length > 0) {
        createInvitations(createInvitationsRequest, setSetInvitationsResponse, () =>
          history.push('/meetings/' + meetingId.id)
        );
      }
      if (survey.questions.length > 0) {
        createSurvey(meetingId.id, survey, setSaveSurveyResponse, () =>
          history.push('/meetings/' + meetingId.id)
        );
      }
      setSaveMeetingResponse({ ...saveMeetingResponse, isSuccess: false });
      history.push('/meetings/' + meetingId.id);
    }
    // eslint-disable-next-line
  }, [meetingId.id]);

  const setPrevState = () => {
    const index: number = modules.indexOf(state);
    if (index !== -1) {
      const newState: creatingMeetingState | undefined = modules
        .filter((module: creatingMeetingState, i: number) => i === index - 1)
        .pop();
      if (newState) {
        setState(newState);
      }
    }
  };

  const setNextState = () => {
    const index: number = modules.indexOf(state);
    if (index !== -1) {
      const newState: creatingMeetingState | undefined = modules
        .filter((module: creatingMeetingState, i: number) => i === index + 1)
        .pop();
      if (newState && (newState !== 'summary' || (!invalidNameDesc && required()(name)))) {
        setState(newState);
      }
    }
  };

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
          showModules={showModules}
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
      <CreateInvitations
        state={state}
        showIcon={true}
        emails={emails}
        setEmails={setEmails}
        setInvitationMessage={setInvitationMessage}
      />
      <OnlineDetails
        state={state}
        onlineLink={onlineLink}
        setOnlineLink={setOnlineLink}
        setOnlinePassword={setOnlinePassword}
      />
      <CreateSurvey survey={survey} setSurvey={setSurvey} state={state} />
      <Row className="justify-content-center mt-2">
        <Col xs="auto">
          {state !== 'modules' && (
            <div className={styles.navigationContainer}>
              <LeftArrowButton onclick={setPrevState} disabled={state === 'name'} />
              <RightArrowButton onclick={setNextState} disabled={state === 'summary'} />
            </div>
          )}
        </Col>
      </Row>
      {state === 'summary' && (
        <>
          <Row className="justify-content-center ml-sm-5">
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
    </Container>
  );
};

export default CreateMeeting;
