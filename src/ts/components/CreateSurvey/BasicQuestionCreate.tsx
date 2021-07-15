import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
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
    <div className="mt-3">
      <TextArea
        label="Question description"
        valueHandler={saveQuestion}
        className={styles.questionTextArea}
        placeholder={'Please type question ...'}
      />
    </div>
  );
};

export default BasicQuestionCreate;
