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
import { saveMeeting } from '../../API/meeting/meetinService';
import { ApiCall } from '../../API/genericApiCalls';
import { createInvitations } from '../../API/invitation/invitationService';
import { createSurvey } from '../../API/survey/surveyService';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import { useHistory } from 'react-router';
export type creatingMeetingState = 'name' | 'time' | 'invitations' | 'place' | 'survey' | 'summary';

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);
  const history = useHistory();
  const [meetingId, setMeetingId] = useState<{ id: number | undefined }>({ id: undefined });
  const [saveMeetingResponse, setSaveMeetingResponse] = useState<ApiCall>(new ApiCall());
  const [saveInvitationsResponse, setSetInvitationsResponse] = useState<ApiCall>(new ApiCall());
  const [saveSurveyResponse, setSaveSurveyResponse] = useState<ApiCall>(new ApiCall());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [survey, setSurvey] = useState<SurveyWithQuestionsDTO>({
    description: '',
    meetingId: -1,
    questions: [],
  });

  const [state, setState] = useState<creatingMeetingState>('name');

  const saveThisMeeting = () => {
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
    }
    // eslint-disable-next-line
  }, [meetingId.id]);

  // redirect
  useEffect(() => {
    if (meetingId.id) {
      if (
        survey.questions.length > 0 &&
        (saveSurveyResponse.isSuccess || saveSurveyResponse.isFailed)
      ) {
        history.push('/meetings/' + meetingId.id);
      } else if (
        emails.length > 0 &&
        (saveInvitationsResponse.isSuccess || saveInvitationsResponse.isFailed)
      ) {
        history.push('/meetings/' + meetingId.id);
      } else if (saveMeetingResponse.isSuccess) history.push('/meetings/' + meetingId.id);
    }
    // eslint-disable-next-line
  }, [saveMeetingResponse, saveSurveyResponse, saveInvitationsResponse, meetingId]);

  return (
    <Container className="ml-5 ml-sm-auto">
      <MeetingNavbar
        state={state}
        setState={setState}
        disabledSummary={invalidNameDesc || !required()(name)}
      />
      <NameAndDescription
        state={state}
        setName={setName}
        setDescription={setDescription}
        setInvalidNameDesc={setInvalidNameDesc}
      />
      <ChooseTime state={state} setSelectedRanges={setTimeRanges} />
      <CreateInvitations state={state} showIcon={true} emails={emails} setEmails={setEmails} />
      <OnlineDetails
        state={state}
        onlineLink={onlineLink}
        setOnlineLink={setOnlineLink}
        setOnlinePassword={setOnlinePassword}
      />
      <CreateSurvey survey={survey} state={state} />
      {state === 'summary' && (
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <ActionButton
              text="Save meeting"
              onclick={saveThisMeeting}
              disabled={invalidNameDesc || !required()(name)}
              className={styles.saveMeetingButton}
            />
          </Col>
        </Row>
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
