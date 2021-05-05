import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { Type } from '../../model/survey/question/Question';

interface IQuestionCreate {
  id: number;
}

const YesOrNoQuestionCreate = ({ id }: IQuestionCreate) => {
  return <BasicQuestionCreate id={id} type={Type.YES_OR_NO} />;
};

export default YesOrNoQuestionCreate;
