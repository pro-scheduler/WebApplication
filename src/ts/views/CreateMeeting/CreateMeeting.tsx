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
import MeetingSummary from '../../components/CreateMeeting/MeetingSummary';

export type creatingMeetingState = 'name' | 'time' | 'invitations' | 'place' | 'survey' | 'summary';

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [survey, setSurvey] = useState<SurveyWithQuestionsDTO>({
    description: '',
    meetingId: -1,
    questions: [],
  });

  const dispatch: Function = useDispatch();
  const messageStatus = useSelector((state: RootStateOrAny) => {
    return state.messages.createMeetingMessageStatus;
  });
  const message = useSelector((state: RootStateOrAny) => {
    return state.messages.createMeetingMessage;
  });
  const [state, setState] = useState<creatingMeetingState>('name');

  const saveMeeting = () => {
    const meeting: MeetingDetailsDTO =
      onlineLink === ''
        ? new RealMeetingDetailsDTO(name, description, timeRanges)
        : new OnlineMeetingDetailsDTO(name, description, timeRanges, onlineLink, onlinePassword);
    dispatch(
      actions.saveMeeting(
        meeting,
        {
          emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        },
        survey
      )
    );
  };

  return (
    <Container className="ml-5 ml-sm-auto">
      <MeetingNavbar
        state={state}
        setState={setState}
        disabledName={!invalidNameDesc && required()(name)}
        disabledTime={timeRanges.length !== 0}
        disabledInvitations={emails.length !== 0}
        disabledPlace={onlineLink !== ''}
        disabledSurvey={survey.questions.length !== 0}
        disabledSummary={invalidNameDesc || !required()(name)}
      />

      {state === 'name' && (
        <NameAndDescription
          setName={setName}
          setDescription={setDescription}
          setInvalidNameDesc={setInvalidNameDesc}
        />
      )}
      {state === 'time' && <ChooseTime setSelectedRanges={setTimeRanges} />}
      {state === 'invitations' && (
        <CreateInvitations showIcon={true} emails={emails} setEmails={setEmails} />
      )}
      {state === 'place' && (
        <OnlineDetails setOnlineLink={setOnlineLink} setOnlinePassword={setOnlinePassword} />
      )}
      {state === 'survey' && <CreateSurvey survey={survey} />}
      {state === 'summary' && (
        <>
          <MeetingSummary
            name={name}
            description={description}
            emails={emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString())}
            onlineLink={onlineLink}
            onlinePassword={onlinePassword}
            timeRanges={timeRanges}
            survey={survey}
          />
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <ActionButton
                text="Save meeting"
                onclick={saveMeeting}
                disabled={invalidNameDesc || !required()(name)}
              />
            </Col>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          {messageStatus !== 'NO_DISPLAY' && (
            <p className={messageStatus === 'SUCCESS' ? style.messageSuccess : style.messageFailed}>
              {message}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMeeting;
