import React from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { OpenQuestion, Question, Type, YesOrNoQuestion } from '../../model/survey/Question';
import allActions from '../../actions';

export type QuestionProps = {
  id: number;
  type: Type;
};

const BasicQuestionCreate = ({ id, type }: QuestionProps) => {
  const dispatch: Function = useDispatch();

  const saveQuestion = (question: string) => {
    const basicQuestion: Question =
      type === Type.OPEN ? new OpenQuestion(question, id) : new YesOrNoQuestion(question, id);
    dispatch(allActions.surveyActions.addQuestionToSurveyWithQuestionsDTO(basicQuestion));
  };

  return (
    <>
      <Col lg={12} className="text-left">
        <TextArea
          label="Question"
          valueHandler={saveQuestion}
          className={styles.questionTextArea}
        />
      </Col>
    </>
  );
};

export default BasicQuestionCreate;
