import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/Question';
import { BasicQuestionCreateProps } from './BasicQuestionCreate';

const DropdownQuestionCreate = ({ id, updateQuestion }: BasicQuestionCreateProps) => {
  return <QuestionWithOptionsCreate id={id} type={Type.DROPDOWN} updateQuestion={updateQuestion} />;
};

export default DropdownQuestionCreate;
