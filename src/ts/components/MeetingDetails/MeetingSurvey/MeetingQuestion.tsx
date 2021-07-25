import { Question, QuestionType } from '../../../model/survey/Question';
import TextArea from '../../common/forms/TextArea/TextArea';
import styles from './MeetingQuestion.module.css';
import SingleDropdownButton from '../../common/Dropdown/SingleDropdownButton';
import {
  optionToValueLabelPair,
  ValueLabelPair,
  valueLabelPairsToOptions,
} from '../../../model/utils/ValueLabelPair';
import MultiDropdownButton from '../../common/Dropdown/MultiDropdownButton';
import { ChangeEvent, useEffect, useState } from 'react';
import { Answer } from '../../../model/survey/Answer';
import SliderInput from '../../common/forms/Input/SliderInput';
import Card from '../../common/Card/Card';

export type MeetingQuestionProps = {
  question: Question;
  answer: Answer | null;
  setAnswer: (questionId: number | null, newAnswer: Answer) => void;
  questionNumber: number;
};

const MeetingQuestion = ({ question, answer, setAnswer, questionNumber }: MeetingQuestionProps) => {
  const yesOrNoOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];
  const [rating, setRating] = useState(question.fromValue ? question.fromValue : 0);

  useEffect(() => {
    if (question.type === QuestionType.LINEAR_SCALE && answer && answer.rating) {
      setRating(answer.rating);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Card title={'Question ' + questionNumber}>
      <p className={styles.questionLabel}>{question.question}</p>
      {question.type === QuestionType.OPEN && (
        <div className={styles.answerContainer}>
          <TextArea
            defaultValue={answer ? answer.text : ''}
            valueHandler={(e: string) => {
              if (!answer) {
                answer = {
                  id: null,
                  question: question,
                  type: question.type,
                  text: e,
                };
              } else {
                answer.text = e;
              }
              setAnswer(question.id, answer);
            }}
            className={styles.textArea}
          />
        </div>
      )}
      {question.type === QuestionType.YES_OR_NO && (
        <div className={styles.answerContainer}>
          <SingleDropdownButton
            defaultValue={answer ? (answer.decision ? yesOrNoOptions[0] : yesOrNoOptions[1]) : null}
            options={yesOrNoOptions}
            onChange={(e: ValueLabelPair) => {
              if (!answer) {
                answer = {
                  id: null,
                  question: question,
                  type: question.type,
                  decision: e.value === true,
                };
              } else {
                answer.decision = e.value === true;
              }
              setAnswer(question.id, answer);
            }}
            className={styles.dropdown}
          />
        </div>
      )}
      {question.type === QuestionType.DROPDOWN && (
        <div className={styles.answerContainer}>
          <SingleDropdownButton
            defaultValue={
              answer && answer.dropdownChoice ? optionToValueLabelPair(answer.dropdownChoice) : null
            }
            options={question.possibleOptions?.map((option: string) =>
              optionToValueLabelPair(option)
            )}
            onChange={(e: ValueLabelPair) => {
              if (!answer) {
                answer = {
                  id: null,
                  question: question,
                  type: question.type,
                  dropdownChoice: e.value.toString(),
                };
              } else {
                answer.dropdownChoice = e.value.toString();
              }
              setAnswer(question.id, answer);
            }}
            className={styles.dropdown}
          />
        </div>
      )}
      {question.type === QuestionType.MULTI_CHOICE && (
        <div className={styles.answerContainer}>
          <MultiDropdownButton
            defaultValue={
              answer
                ? answer.choices?.map((choice: string) => optionToValueLabelPair(choice))
                : null
            }
            options={question.possibleChoices?.map((choice: string) =>
              optionToValueLabelPair(choice)
            )}
            onChange={(e: ValueLabelPair[]) => {
              const choices = valueLabelPairsToOptions(e);
              if (!answer) {
                answer = {
                  id: null,
                  question: question,
                  type: question.type,
                  choices: choices,
                };
              } else {
                answer.choices = choices;
              }
              setAnswer(question.id, answer);
            }}
            className={styles.dropdown}
          />
        </div>
      )}
      {question.type === QuestionType.LINEAR_SCALE && (
        <div className={styles.answerContainer}>
          <SliderInput
            value={rating}
            min={question.fromValue}
            max={question.toValue}
            onChange={(event: ChangeEvent<HTMLInputElement>, value: number) => {
              setRating(value);
              if (answer == null) {
                answer = {
                  id: null,
                  question: question,
                  type: question.type,
                  rating: value,
                };
              } else {
                answer.rating = value;
              }
              setAnswer(question.id, answer);
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default MeetingQuestion;
