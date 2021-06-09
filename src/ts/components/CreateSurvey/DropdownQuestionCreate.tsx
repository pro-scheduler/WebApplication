import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Question, QuestionType } from '../../model/survey/Question';

export type TypedQuestionCreateProps = {
  id: number;
  updateQuestion: (question: Question) => void;
};

const DropdownQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  return (
    <QuestionWithOptionsCreate
      id={id}
      type={QuestionType.DROPDOWN}
      updateQuestion={updateQuestion}
    />
  );
};

export default DropdownQuestionCreate;
