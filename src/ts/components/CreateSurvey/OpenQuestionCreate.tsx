import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { Type } from '../../model/survey/Question';

const OpenQuestionCreate = ({ id }: { id: number }) => {
  return <BasicQuestionCreate id={id} type={Type.OPEN} />;
};

export default OpenQuestionCreate;
