import { Question, Type } from '../../../model/survey/Question';
import TextArea from '../../common/forms/TextArea/TextArea';
import styles from './MeetingQuestion.module.css';
import SingleDropdownButton from '../../common/Dropdown/SingleDropdownButton';
import { optionToValueLabelPair } from '../../../model/utils/ValueLabelPair';
import MultiDropdownButton from '../../common/Dropdown/MultiDropdownButton';
import { useState } from 'react';

export type MeetingQuestionProps = {
  question: Question;
};

const MeetingQuestion = ({ question }: MeetingQuestionProps) => {
  const yesOrNoOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];
  const [value, setValue] = useState(question.fromValue ? question.fromValue : 0);
  return (
    <div className={styles.meetingQuestion}>
      <p className={styles.questionLabel}>{question.question}</p>
      {question.type === Type.OPEN && (
        <TextArea valueHandler={(e: string) => console.log(e)} className={styles.textArea} />
      )}
      {question.type === Type.YES_OR_NO && (
        <SingleDropdownButton
          options={yesOrNoOptions}
          onChange={(e: string) => console.log(e)}
          className={styles.dropdown}
        />
      )}
      {question.type === Type.DROPDOWN && (
        <SingleDropdownButton
          options={question.possibleOptions?.map((option: string) =>
            optionToValueLabelPair(option)
          )}
          onChange={(e: string) => console.log(e)}
          className={styles.dropdown}
        />
      )}
      {question.type === Type.MULTI_CHOICE && (
        <MultiDropdownButton
          options={question.possibleChoices?.map((choice: string) =>
            optionToValueLabelPair(choice)
          )}
          onChange={(e: string) => console.log(e)}
          className={styles.dropdown}
        />
      )}
      {question.type === Type.LINEAR_SCALE && (
        <>
          <input
            type="range"
            min={question.fromValue}
            max={question.toValue}
            defaultValue={value}
            onChange={(event) => setValue(parseInt(event.target.value))}
            className={styles.linear}
          />
          {value}
        </>
      )}
    </div>
  );
};

export default MeetingQuestion;
