import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SurveyIcon from '../common/Icons/SurveyIcon';
import style from './NameAndDesctiption.module.css';
import PlusButton from '../common/RoundButtons/PlusButton';
import styles from './CreateSurvey.module.css';
import QuestionField from './QuestionField';
import { useEffect, useState } from 'react';

const CreateSurvey = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  const createNewQuestion = () => {
    setQuestions([...questions, <QuestionField key={questions.length} />]);
  };

  useEffect(() => {
    setQuestions([]);
  }, []);

  return (
    <div className="mb-5">
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <SurveyIcon />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Create survey</div>
      </Row>

      <Row className="justify-content-center mt-4">{questions}</Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.addQuestionButton}>
          Add question
          <PlusButton className={styles.button} onclick={createNewQuestion} />
        </div>
      </Row>
    </div>
  );
};

export default CreateSurvey;
