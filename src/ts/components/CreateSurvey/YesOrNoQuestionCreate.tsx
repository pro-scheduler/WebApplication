import React from 'react';
import BasicQuestionCreate from './BasicQuestionCreate';

interface IQuestionCreate {
  id: number;
}

const YesOrNoQuestionCreate = ({ id }: IQuestionCreate) => {
  return <BasicQuestionCreate id={id} type={'yesOrNo'} />;
};

export default YesOrNoQuestionCreate;
