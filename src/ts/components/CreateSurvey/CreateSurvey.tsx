import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SurveyIcon from '../common/Icons/SurveyIcon';
import PlusButton from '../common/RoundButtons/PlusButton';
import styles from './CreateSurvey.module.css';
import QuestionCreate from './QuestionCreate';
import React, { useEffect, useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { Question } from '../../model/survey/Question';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import Card from '../common/Card/Card';

export type CreateSurveyProps = {
  state: creatingMeetingState;
  survey: SurveyWithQuestionsDTO;
  setSurvey: (newSurvey: SurveyWithQuestionsDTO) => void;
};

const CreateSurvey = ({ state, survey, setSurvey }: CreateSurveyProps) => {
  const [questions, setQuestions] = useState<number[]>([]);
  const [questionId, setQuestionId] = useState(0);

  const createNewQuestion = () => {
    setQuestions([...questions, questionId]);
    setQuestionId(questionId + 1);
  };

  const updateQuestion = (questionToUpdate: Question) => {
    const updatedQuestions = survey.questions.filter(
      (question: Question) => question.id !== questionToUpdate.id
    );
    setSurvey({ ...survey, questions: [...updatedQuestions, questionToUpdate] });
  };

  const deleteQuestion = (idToDelete: number) => {
    setSurvey({
      ...survey,
      questions: survey.questions.filter((question: Question) => question.id !== idToDelete),
    });
    setQuestions(questions.filter((id: number) => idToDelete !== id));
  };

  const saveSurveyDescription = (description: string) => {
    setSurvey({ ...survey, description: description });
  };

  useEffect(() => {
    setQuestions([]);
  }, []);

  return (
    <div
      className={
        state !== 'survey' && (state !== 'summary' || questions.length === 0) ? styles.hidden : ''
      }
    >
      <Row className="justify-content-center mt-5">
        <Col lg={12} className="text-center">
          <SurveyIcon />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <div className={styles.createHeader}>Create survey</div>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col>
          <Card title={'Survey Description'}>
            <TextArea
              valueHandler={saveSurveyDescription}
              placeholder="Please type survey description ..."
            />
          </Card>
        </Col>
      </Row>

      {questions.map((id: number, index: number) => {
        return (
          <Row className="justify-content-center mt-2" key={id}>
            <Col>
              <QuestionCreate
                questionNumber={index + 1}
                id={id}
                updateQuestion={updateQuestion}
                onDelete={() => deleteQuestion(id)}
              />
            </Col>
          </Row>
        );
      })}

      <Row className="justify-content-center my-4">
        <Col xs="auto" lg={2} className="text-right mr-0 pr-0 offset-lg-8">
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
