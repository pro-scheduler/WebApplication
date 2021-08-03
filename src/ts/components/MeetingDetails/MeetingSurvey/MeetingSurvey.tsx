import Col from 'react-bootstrap/Col';
import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import styles from './MeetingSurvey.module.css';
import SwitchButton from '../../common/SwitchButton/SwitchButton';
import { RiPencilFill } from 'react-icons/ri';
import { BsFillPieChartFill } from 'react-icons/bs';
import { useState } from 'react';
import MeetingSurveyQuestions from './MeetingSurveyQuestions';
import MeetingSurveyAnswers from './MeetingSurveyAnswers';
import { SurveySummary, UserSurvey } from '../../../model/survey/Survey';
import MeetingSurveyDetails from './MeetingSurveyDetails';
import MeetingSurveyResults from './MeetingSurveyResults';

export type MeetingSurveyProps = {
  survey: UserSurvey;
  setRefreshSurveySummary: (value: number) => void;
  surveySummary: SurveySummary | undefined;
  numberOfParticipants: number;
};
const MeetingSurvey = ({
  survey,
  setRefreshSurveySummary,
  surveySummary,
  numberOfParticipants,
}: MeetingSurveyProps) => {
  const [displayAnswers, setDisplayAnswers] = useState<Boolean>(false);

  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <LineWithHeader header={'Survey'} iconAction={() => {}} />
      <Col lg={6}>
        <MeetingSurveyDetails endDate={survey.surveyEndDate} description={survey.description} />
      </Col>
      <Col lg={6}>
        <MeetingSurveyResults
          numberOfParticipants={numberOfParticipants}
          numberOfFilledSurveys={surveySummary ? surveySummary.finishedParticipantsCount : 0}
          emails={surveySummary?.users ?? []}
        />
      </Col>
      <Col lg={12} className="text-center mx-auto">
        <div className={styles.switchTime}>
          <SwitchButton
            onChange={() => setDisplayAnswers(!displayAnswers)}
            checkedIcon={<BsFillPieChartFill className={styles.switchIcon} />}
            unCheckedIcon={<RiPencilFill className={styles.switchIcon} />}
          />
        </div>
      </Col>
      {displayAnswers ? (
        <MeetingSurveyQuestions survey={survey} setRefreshSurveySummary={setRefreshSurveySummary} />
      ) : (
        surveySummary && <MeetingSurveyAnswers surveySummary={surveySummary} />
      )}
    </Row>
  );
};

export default MeetingSurvey;
