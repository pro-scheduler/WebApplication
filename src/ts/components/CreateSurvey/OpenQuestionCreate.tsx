import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { Type } from '../../model/survey/question/Question';

interface IQuestionCreate {
  id: number;
}

const OpenQuestionCreate = ({ id }: IQuestionCreate) => {
  return <BasicQuestionCreate id={id} type={Type.OPEN} />;
};

export default OpenQuestionCreate;
