import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/Question';

const MultiChoiceQuestionCreate = ({ id }: { id: number }) => {
  return <QuestionWithOptionsCreate id={id} type={Type.MULTI_CHOICE} />;
};

export default MultiChoiceQuestionCreate;
