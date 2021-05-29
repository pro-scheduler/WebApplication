import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SurveyIcon from '../common/Icons/SurveyIcon';
import style from '../CreateMeeting/NameAndDesctiption.module.css';
import PlusButton from '../common/RoundButtons/PlusButton';
import styles from './CreateSurvey.module.css';
import QuestionCreate from './QuestionCreate';
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import TextArea from '../common/forms/TextArea/TextArea';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { Question } from '../../model/survey/Question';

export type CreateSurveyProps = {
  survey: SurveyWithQuestionsDTO;
};

const CreateSurvey = ({ survey }: CreateSurveyProps) => {
  const [questions, setQuestions] = useState<number[]>([]);
  const [questionId, setQuestionId] = useState(0);

  const createNewQuestion = () => {
    setQuestions([...questions, questionId]);
    setQuestionId(questionId + 1);
  };

  const updateQuestion = (questionToUpdate: Question) => {
    survey.questions = survey.questions.filter(
      (question: Question) => question.id !== questionToUpdate.id
    );
    survey.questions.push(questionToUpdate);
  };

  const deleteQuestion = (idToDelete: number) => {
    survey.questions = survey.questions.filter((question: Question) => question.id !== idToDelete);
    setQuestions(questions.filter((id: number) => idToDelete !== id));
  };

  const saveSurveyDescription = (description: string) => {
    survey.description = description;
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
        <Col xs={8} lg={8} className="text-left">
          <TextArea
            label="Survey Description"
            valueHandler={saveSurveyDescription}
            className={styles.surveyDescriptionInput}
          />
        </Col>
        {questions.map((id: number) => {
          return (
            <QuestionCreate
              key={id}
              id={id}
              updateQuestion={updateQuestion}
              deleteButton={
                <TiDelete
                  className={styles.removeQuestionButton}
                  onClick={() => deleteQuestion(id)}
                  key={id}
                />
              }
            />
          );
        })}
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs="auto" lg={2} className="text-right mr-0 pr-0 offset-lg-7">
          <div className={styles.addQuestionButton}>
            Add question
            <PlusButton className={styles.button} onclick={createNewQuestion} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default CreateSurvey;
