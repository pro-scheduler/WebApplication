import React from 'react';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import styles from './OpenAnswers.module.css';
import { Entry } from '../../../model/survey/Survey';

const OpenAnswers = ({ data, question }: { data: Entry[]; question: string }) => {
  const answers = data.map((entry: Entry, index: number) => (
    <div key={index}>
      <VscDebugBreakpointLog className={styles.answerIcon} />
      {entry.answer}
    </div>
  ));
  return (
    <div className={styles.openAnswersContainer}>
      <p>{question}</p>
      <hr className={styles.questionLine} />
      <div className={styles.answersContainer}>
        {answers.length ? answers : <p className={styles.noAnswersInfo}>There are no answers</p>}
      </div>
    </div>
  );
};

export default OpenAnswers;
