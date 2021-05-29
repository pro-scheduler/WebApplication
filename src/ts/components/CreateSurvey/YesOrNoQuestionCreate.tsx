import React from 'react';
import BasicQuestionCreate, { BasicQuestionCreateProps } from './BasicQuestionCreate';
import { Type } from '../../model/survey/Question';

const YesOrNoQuestionCreate = ({ id, updateQuestion }: BasicQuestionCreateProps) => {
  return <BasicQuestionCreate id={id} type={Type.YES_OR_NO} updateQuestion={updateQuestion} />;
};

export default YesOrNoQuestionCreate;
