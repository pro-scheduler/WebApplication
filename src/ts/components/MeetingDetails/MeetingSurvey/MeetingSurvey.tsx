import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineWithHeader from '../LineWithHeader';
import { UserSurvey } from '../../../model/survey/Survey';
import MeetingQuestion from './MeetingQuestion';

const MeetingSurvey = ({ survey }: { survey: UserSurvey }) => {
  const questions = survey.questionsAndAnswers.map((value) => {
    return <MeetingQuestion question={value.question} />;
  });
  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <Col>
        <LineWithHeader header={'Why'} />
        <div className="ml-3">
          <p>{survey.description}</p>
          {questions}
        </div>
      </Col>
    </Row>
  );
};

export default MeetingSurvey;
