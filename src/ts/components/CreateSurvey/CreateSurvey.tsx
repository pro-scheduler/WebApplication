import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SurveyIcon from '../common/Icons/SurveyIcon';
import style from '../CreateMeeting/NameAndDesctiption.module.css';
import PlusButton from '../common/RoundButtons/PlusButton';
import styles from './CreateSurvey.module.css';
import QuestionCreate from './QuestionCreate';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import allActions from '../../actions';

const CreateSurvey = () => {
  const dispatch: Function = useDispatch();
  const [questions, setQuestions] = useState<number[]>([]);
  const [questionId, setQuestionId] = useState(0);

  const createNewQuestion = () => {
    setQuestions([...questions, questionId]);
    setQuestionId(questionId + 1);
  };

  const deleteQuestion = (idToDelete: number) => {
    dispatch(allActions.surveyActions.removeQuestionFromSurveyWithQuestionsDTO(idToDelete));
    setQuestions(questions.filter((id: number) => idToDelete !== id));
  };

  const saveSurvey = () => {
    console.log('Saving survey');
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

      <Row className="justify-content-center mt-4">
        {questions.map((id: number) => {
          return (
            <QuestionCreate
              key={id}
              id={id}
              deleteButton={
                <TiDelete
                  className="ml-2 removeOptionButton"
                  onClick={() => deleteQuestion(id)}
                  key={id}
                />
              }
            />
          );
        })}
      </Row>

      <Row className="justify-content-center mt-4">
        <Col lg={2} className="text-right mr-0 pr-0 offset-9">
          <div className={styles.addQuestionButton}>
            Add question
            <PlusButton className={styles.button} onclick={createNewQuestion} />
          </div>
        </Col>
      </Row>
      {questions.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col lg={12} className="text-center">
            <ActionButton className={''} onclick={saveSurvey} text={'Save survey'} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CreateSurvey;
