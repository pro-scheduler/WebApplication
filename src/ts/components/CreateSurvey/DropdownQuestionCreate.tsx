import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Question, Type } from '../../model/survey/Question';

export type TypedQuestionCreateProps = {
  id: number;
  updateQuestion: (question: Question) => void;
};

const DropdownQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  return <QuestionWithOptionsCreate id={id} type={Type.DROPDOWN} updateQuestion={updateQuestion} />;
};

export default DropdownQuestionCreate;
