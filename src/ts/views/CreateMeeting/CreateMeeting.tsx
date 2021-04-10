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

type meetingState = { messageStatus: string; message: string; meetings: Meeting[] };
type messageState = { createMeetingMessageStatus: string; createMeetingMessage: string };
interface RootState {
  meetings: meetingState;
  messages: messageState;
}

const CreateMeeting = () => {
  const dispatch: Function = useDispatch();
  // const meetings: Meeting[] = useSelector((state: RootState) => {
  //   return state.meetings.meetings;
  // });
  const messageStatus = useSelector((state: RootState) => {
    return state.messages.createMeetingMessageStatus;
  });
  const message = useSelector((state: RootState) => {
    return state.messages.createMeetingMessage;
  });
  const saveMeeting = () => {
    dispatch(actions.saveMeeting({ name: 'MeetingName', description: 'desc', meetingId: 0 }));
  };

  useEffect(() => {
    dispatch(actions.fetchAllMeetings());
    // eslint-disable-next-line
  }, []);
  // empty [] allows to treat useEffect() as componentDidMount in class components, https://stackoverflow.com/questions/56249151/react-useeffect-hook-componentdidmount-to-useeffect
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <PencilIcon />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-4">Describe Meeting</Row>
      <Row className="justify-content-md-left mt-4">
        <Col />
        <Col md="auto">
          <SingleValueInput label="Name" />
          <TextArea label="Description" />
        </Col>
        <Col />
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <ActionButton text="Submit" onclick={saveMeeting} className="button" />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          {message} {messageStatus}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMeeting;
