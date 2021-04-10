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
interface RootState {
  meetings: Meeting[];
}

const CreateMeeting = () => {
  const dispatch: Function = useDispatch();
  const meetings: Meeting[] = useSelector((state: RootState) => {
    console.log(state);
    return state.meetings;
  });

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
          <ActionButton text="Submit" onclick={() => console.log('click')} className="button" />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMeeting;
