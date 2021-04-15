import { useEffect } from 'react';
import actions from '../../actions/meetingActions';
import { useDispatch, useSelector } from 'react-redux';
import Meeting from '../../model/Meeting';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../../components/common/Icons/PencilIcon';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import SingleValueInput from '../../components/common/forms/Input/SingleValueInput';
import TextArea from '../../components/common/forms/TextArea/TextArea';
import style from './CreateMeeting.module.css';
import { useState } from 'react';

type meetingState = { messageStatus: string; message: string; meetings: Meeting[] };
type messageState = { createMeetingMessageStatus: string; createMeetingMessage: string };
interface RootState {
  meetings: meetingState;
  messages: messageState;
}

const CreateMeeting = () => {
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
        meetingId: 0,
        availableTimeRanges: [],
      })
    );
  };

  useEffect(() => {
    dispatch(actions.fetchAllMeetings());
    // eslint-disable-next-line
  }, []);
  // empty [] allows to treat useEffect() as componentDidMount in class components, https://stackoverflow.com/questions/56249151/react-useeffect-hook-componentdidmount-to-useeffect
  return (
    <Container className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <PencilIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">Describe Meeting</Row>
      <Row className="justify-content-center mt-4">
        <Col />
        <Col xs="auto">
          <SingleValueInput label="Name" valueHandler={setName} />
          <div className="mt-4">
            <TextArea label="Description" valueHandler={setDescription} />
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
    </Container>
  );
};

export default CreateMeeting;
