import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';
import { Type } from '../../model/survey/question/Question';

interface IQuestionCreate {
  id: number;
}

const DropdownQuestionCreate = ({ id }: IQuestionCreate) => {
  return <QuestionWithOptionsCreate id={id} type={Type.DROPDOWN} />;
};

export default DropdownQuestionCreate;
