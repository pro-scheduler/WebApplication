import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../common/Icons/PencilIcon';
import style from './NameAndDesctiption.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from '../../actions/meetingActions';
import Meeting from '../../model/meeting/Meeting';

type meetingState = { messageStatus: string; message: string; meetings: Meeting[] };
type messageState = { createMeetingMessageStatus: string; createMeetingMessage: string };
interface RootState {
  meetings: meetingState;
  messages: messageState;
}

const NameAndDescription = () => {
  const dispatch: Function = useDispatch();
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
        attendees: [],
        organizers: [],
      })
    );
  };
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
            <p className={style.pComment}>You always can change your preferences later</p>
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
          {messageStatus === 'NO_DISPLAY' ? null : (
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
