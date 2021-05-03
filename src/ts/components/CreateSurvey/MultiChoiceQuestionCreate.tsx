import React from 'react';
import QuestionWithOptionsCreate from './QuestionWithOptionsCreate';

interface IQuestionCreate {
  id: number;
}

const MultiChoiceQuestionCreate = ({ id }: IQuestionCreate) => {
  return <QuestionWithOptionsCreate id={id} type={'multiChoice'} />;
};

export default MultiChoiceQuestionCreate;
