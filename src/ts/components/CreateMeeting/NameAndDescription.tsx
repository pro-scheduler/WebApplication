import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../common/Icons/PencilIcon';
import style from './NameAndDesctiption.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from '../../actions/meetingActions';
import Meeting from '../../model/meeting/Meeting';
import ProUser from '../../model/ProUser';
import allActions from '../../actions';

type meetingState = { messageStatus: string; message: string; meetings: Meeting[] };
type messageState = { createMeetingMessageStatus: string; createMeetingMessage: string };
interface RootState {
  meetings: meetingState;
  messages: messageState;
}

const NameAndDescription = () => {
  const dispatch: Function = useDispatch();
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const messageStatus = useSelector((state: RootState) => {
    return state.messages.createMeetingMessageStatus;
  });
  const message = useSelector((state: RootState) => {
    return state.messages.createMeetingMessage;
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const saveMeeting = () => {
    dispatch(
      actions.saveMeeting({
        name: name,
        description: description,
        id: 0,
        availableTimeRanges: [],
        participants: [],
        organizers: [],
      })
    );
  };

  useEffect(() => {
    dispatch(allActions.userActions.fetchUserOrganizedMeetings(user.id));
  }, [dispatch, messageStatus, user.id]);

  useEffect(() => {
    const createdMeeting: Meeting | undefined = user.organizedMeetings
      .filter((meeting: Meeting) => meeting.name === name)
      .pop();
    dispatch(
      allActions.surveyActions.setMeetingIdInSurveyWithQuestionsDTO(
        createdMeeting === undefined ? 0 : createdMeeting.id
      )
    );
  }, [dispatch, name, user.organizedMeetings]);

  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <PencilIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Describe Meeting</div>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col />
        <Col xs="auto">
          <SingleValueInput label="Name" valueHandler={setName} />
          <div className="mt-4">
            <TextArea label="Description" valueHandler={setDescription} className={''} />
          </div>
        </Col>
        <Col />
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <ActionButton text="Submit" onclick={saveMeeting} className="button" />
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
    </div>
  );
};

export default NameAndDescription;
