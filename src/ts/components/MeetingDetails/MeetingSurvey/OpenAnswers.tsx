import React from 'react';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import styles from './OpenAnswers.module.css';
import { Entry } from '../../../model/survey/Survey';
import Card from '../../common/Card/Card';

const OpenAnswers = ({
  data,
  question,
  questionNumber,
}: {
  data: Entry[];
  question: string;
  questionNumber: number;
}) => {
  const answers = data.map((entry: Entry, index: number) => (
    <div key={index}>
      <VscDebugBreakpointLog className={styles.answerIcon} />
      {entry.answer}
    </div>
  ));
  return (
    <Card title={'Question ' + questionNumber}>
      <p>{question}</p>
      <div className={styles.answersContainer}>
        {answers.length ? answers : <p className={styles.noAnswersInfo}>There are no answers</p>}
      </div>
    </Card>
  );
};

export default OpenAnswers;
