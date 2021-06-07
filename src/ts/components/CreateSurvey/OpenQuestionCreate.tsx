import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { Type } from '../../model/survey/Question';
import { TypedQuestionCreateProps } from './DropdownQuestionCreate';

const OpenQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  return <BasicQuestionCreate id={id} type={Type.OPEN} updateQuestion={updateQuestion} />;
};

export default OpenQuestionCreate;
