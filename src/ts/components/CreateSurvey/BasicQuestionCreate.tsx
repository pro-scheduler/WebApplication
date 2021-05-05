import React from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import Question, { Type } from '../../model/survey/question/Question';
import allActions from '../../actions';
import OpenQuestion from '../../model/survey/question/types/OpenQuestion';
import YesOrNoQuestion from '../../model/survey/question/types/YesOrNoQuestion';

interface IQuestionCreate {
  id: number;
  type: Type;
}

const BasicQuestionCreate = ({ id, type }: IQuestionCreate) => {
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
