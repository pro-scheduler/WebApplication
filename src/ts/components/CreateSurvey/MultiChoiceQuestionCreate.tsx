import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/Question';
import { TypedQuestionCreateProps } from './DropdownQuestionCreate';

const MultiChoiceQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  return (
    <QuestionWithOptionsCreate id={id} type={Type.MULTI_CHOICE} updateQuestion={updateQuestion} />
  );
};

export default MultiChoiceQuestionCreate;
