import React, { useEffect, useState } from 'react';
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
import { Meeting, OnlineMeeting, RealMeeting } from '../../model/meeting/Meeting';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [timeRanges, setTimeRanges] = useState<TimeRangeDTO[]>([]);

  const dispatch: Function = useDispatch();
  const messageStatus = useSelector((state: RootStateOrAny) => {
    return state.messages.createMeetingMessageStatus;
  });
  const message = useSelector((state: RootStateOrAny) => {
    return state.messages.createMeetingMessage;
  });
  const survey = useSelector((state: RootStateOrAny) => {
    return state.surveyReducer;
  });
  useEffect(() => console.log(timeRanges), [timeRanges]);
  const saveMeeting = () => {
    const meeting: Meeting =
      onlineLink === ''
        ? new RealMeeting(0, name, description, timeRanges, [], [])
        : new OnlineMeeting(0, name, description, timeRanges, [], [], onlineLink, onlinePassword);
    dispatch(
      actions.saveMeeting(
        meeting,
        {
          emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        },
        survey.newSurvey
      )
    );
  };

  return (
    <Container className="ml-5 ml-sm-auto">
      <NameAndDescription
        setName={setName}
        setDescription={setDescription}
        setInvalidNameDesc={setInvalidNameDesc}
      />
      <ChooseTime setSelectedRanges={setTimeRanges} />
      <CreateInvitations showIcon={true} emails={emails} setEmails={setEmails} />
      <OnlineDetails setOnlineLink={setOnlineLink} setOnlinePassword={setOnlinePassword} />
      <CreateSurvey />
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <ActionButton
            text="Create meeting"
            onclick={saveMeeting}
            disabled={invalidNameDesc || !required()(name)}
          />
        </Col>
      </Row>
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
