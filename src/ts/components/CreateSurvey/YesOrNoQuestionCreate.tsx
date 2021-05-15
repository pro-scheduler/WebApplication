import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { Type } from '../../model/survey/Question';

const YesOrNoQuestionCreate = ({ id }: { id: number }) => {
  return <BasicQuestionCreate id={id} type={Type.YES_OR_NO} />;
};

export default YesOrNoQuestionCreate;
