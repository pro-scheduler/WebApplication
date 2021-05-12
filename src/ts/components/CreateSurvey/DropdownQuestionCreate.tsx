import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/Question';

const DropdownQuestionCreate = ({ id }: { id: number }) => {
  return <QuestionWithOptionsCreate id={id} type={Type.DROPDOWN} />;
};

export default DropdownQuestionCreate;
