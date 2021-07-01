import Col from 'react-bootstrap/Col';
import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import styles from './MeetingSurvey.module.css';
import SwitchButton from '../../common/SwitchButton/SwitchButton';
import { RiPencilFill } from 'react-icons/ri';
import { BsFillPieChartFill } from 'react-icons/bs';
import { useState } from 'react';
import MeetingSurveyQuestions from './MeetingSurveyQuestions';
import MeetingSurveyResults from './MeetingSurveyResults';
import { SurveySummary, UserSurvey } from '../../../model/survey/Survey';

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
  const [displayAnswers, setDisplayAnswers] = useState<Boolean>(true);

  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <Col>
        <LineWithHeader header={'Survey'} />
        <Col lg={12} className="text-center mx-auto">
          <div className={styles.switchTime}>
            <SwitchButton
              onChange={() => setDisplayAnswers(!displayAnswers)}
              checkedIcon={<RiPencilFill className={styles.switchIcon} />}
              unCheckedIcon={<BsFillPieChartFill className={styles.switchIcon} />}
            />
          </div>
        </Col>
        {displayAnswers ? (
          <MeetingSurveyQuestions
            survey={survey}
            setRefreshSurveySummary={setRefreshSurveySummary}
          />
        ) : (
          surveySummary && (
            <MeetingSurveyResults
              surveySummary={surveySummary}
              numberOfParticipants={numberOfParticipants}
            />
          )
        )}
      </Col>
    </Row>
  );
};

export default MeetingSurvey;
