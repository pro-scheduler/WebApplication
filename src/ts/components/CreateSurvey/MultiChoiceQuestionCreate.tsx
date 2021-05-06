import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/question/Question';

interface IQuestionCreate {
  id: number;
}

const MultiChoiceQuestionCreate = ({ id }: IQuestionCreate) => {
  return <QuestionWithOptionsCreate id={id} type={Type.MULTI_CHOICE} />;
};

export default MultiChoiceQuestionCreate;
