import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/Question';
import { BasicQuestionCreateProps } from './BasicQuestionCreate';

const MultiChoiceQuestionCreate = ({ id, updateQuestion }: BasicQuestionCreateProps) => {
  return (
    <QuestionWithOptionsCreate id={id} type={Type.MULTI_CHOICE} updateQuestion={updateQuestion} />
  );
};

export default MultiChoiceQuestionCreate;
