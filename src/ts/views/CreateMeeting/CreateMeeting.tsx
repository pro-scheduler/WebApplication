import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NameAndDescription from '../../components/CreateMeeting/NameAndDescription';
import CreateSurvey from '../../components/CreateSurvey/CreateSurvey';
import CreateInvitations from '../../components/CreateMeeting/CreateInvitations';
import ChooseTime from '../../components/CreateMeeting/ChooseTime';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import style from '../../components/CreateMeeting/NameAndDesctiption.module.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';
// eslint-disable-next-line
import actions from '../../actions/meetingActions';
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
export type creatingMeetingState = 'name' | 'time' | 'invitations' | 'place' | 'survey' | 'summary';

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);
  const [saveResponse, setSaveResponse] = useState<ApiCall<any>>(new ApiCall<any>());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [survey, setSurvey] = useState<SurveyWithQuestionsDTO>({
    description: '',
    meetingId: -1,
    questions: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch: Function = useDispatch();
  const messageStatus = useSelector((state: RootStateOrAny) => {
    return state.messages.createMeetingMessageStatus;
  });
  const message = useSelector((state: RootStateOrAny) => {
    return state.messages.createMeetingMessage;
  });
  const [state, setState] = useState<creatingMeetingState>('name');

  const saveThisMeeting = () => {
    const meeting: MeetingDetailsDTO =
      onlineLink === ''
        ? new RealMeetingDetailsDTO(name, description, timeRanges)
        : new OnlineMeetingDetailsDTO(name, description, timeRanges, onlineLink, onlinePassword);
    // dispatch(
    //   actions.saveMeeting(
    //     meeting,
    //     {
    //       emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
    //     },
    //     survey
    //   )
    // );
    saveMeeting(meeting, setSaveResponse, 'Meeting created successfully');
  };

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
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          {messageStatus !== 'NO_DISPLAY' && (
            <p className={messageStatus === 'SUCCESS' ? style.messageSuccess : style.messageFailed}>
              {message}
            </p>
          )}
          {saveResponse.isSuccess && 'Success'}
          {saveResponse.isFailed && 'Failed'}
          {saveResponse.isLoading && 'Loading'}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMeeting;
