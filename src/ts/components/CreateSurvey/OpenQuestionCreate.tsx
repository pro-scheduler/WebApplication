import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';

interface IQuestionCreate {
  id: number;
}

const OpenQuestionCreate = ({ id }: IQuestionCreate) => {
  return <BasicQuestionCreate id={id} type={'open'} />;
};

export default OpenQuestionCreate;
