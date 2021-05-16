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

const CreateMeeting = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emails, setEmails] = useState<ValueLabelPair[]>([]);
  const [onlineLink, setOnlineLink] = useState<string>('');
  const [onlinePassword, setOnlinePassword] = useState<string>('');

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

  const saveMeeting = () => {
    dispatch(
      actions.saveMeeting(
        {
          name: name,
          description: description,
          id: 0,
          availableTimeRanges: [],
          participants: [],
          organizers: [],
        },
        {
          emails: emails.map((valueLabelPair: ValueLabelPair) => valueLabelPair.label.toString()),
        },
        survey.newSurvey
      )
    );
  };

  return (
    <Container className="ml-5 ml-sm-auto">
      <NameAndDescription setName={setName} setDescription={setDescription} />
      <ChooseTime />
      <CreateInvitations showIcon={true} emails={emails} setEmails={setEmails} />
      <OnlineDetails setOnlineLink={setOnlineLink} setOnlinePassword={setOnlinePassword} />
      <CreateSurvey />
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <ActionButton text="Create meeting" onclick={saveMeeting} />
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
