import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';
import { QuestionType } from '../../model/survey/Question';
import { TypedQuestionCreateProps } from './DropdownQuestionCreate';

const OpenQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  return <BasicQuestionCreate id={id} type={QuestionType.OPEN} updateQuestion={updateQuestion} />;
};

export default OpenQuestionCreate;
