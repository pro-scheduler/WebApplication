import React from 'react';
import BasicQuestionCreate, { BasicQuestionCreateProps } from './BasicQuestionCreate';
import { Type } from '../../model/survey/Question';

const OpenQuestionCreate = ({ id, updateQuestion }: BasicQuestionCreateProps) => {
  return <BasicQuestionCreate id={id} type={Type.OPEN} updateQuestion={updateQuestion} />;
};

export default OpenQuestionCreate;
