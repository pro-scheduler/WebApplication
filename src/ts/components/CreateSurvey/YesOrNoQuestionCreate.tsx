import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { Type } from '../../model/survey/Question';
import { TypedQuestionCreateProps } from './DropdownQuestionCreate';

const YesOrNoQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  return <BasicQuestionCreate id={id} type={Type.YES_OR_NO} updateQuestion={updateQuestion} />;
};

export default YesOrNoQuestionCreate;
