import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';

interface IQuestionCreate {
  id: number;
}

const DropdownQuestionCreate = ({ id }: IQuestionCreate) => {
  return <QuestionWithOptionsCreate id={id} type={'dropdown'} />;
};

export default DropdownQuestionCreate;
