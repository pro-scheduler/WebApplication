import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import { Question, QuestionType } from '../../model/survey/Question';
import { TypedQuestionCreateProps } from './DropdownQuestionCreate';

export type BasicQuestionCreateProps = {
  type: QuestionType;
} & TypedQuestionCreateProps;

const BasicQuestionCreate = ({ id, type, updateQuestion }: BasicQuestionCreateProps) => {
  const [question, setQuestion] = useState<Question>({
    id: id,
    question: '',
    type: type,
  });

  const saveQuestion = (value: string) => {
    question.question = value;
    setQuestion(question);
    updateQuestion(question);
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
