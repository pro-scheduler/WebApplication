import styles from './QuestionCreate.module.css';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';
import React, { useState } from 'react';
import LinearScaleQuestionCreate from './LinearScaleQuestionCreate';
import OpenQuestionCreate from './OpenQuestionCreate';
import YesOrNoQuestionCreate from './YesOrNoQuestionCreate';
import DropdownQuestionCreate from './DropdownQuestionCreate';
import MultiChoiceQuestionCreate from './MultiChoiceQuestionCreate';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';
import { Question, QuestionType } from '../../model/survey/Question';
import Card from '../common/Card/Card';

const options = [
  new ValueLabelPair(QuestionType.DROPDOWN, 'Dropdown'),
  new ValueLabelPair(QuestionType.LINEAR_SCALE, 'Linear Scale'),
  new ValueLabelPair(QuestionType.MULTI_CHOICE, 'MultiChoice'),
  new ValueLabelPair(QuestionType.OPEN, 'Open'),
  new ValueLabelPair(QuestionType.YES_OR_NO, 'Yes or No'),
];

export type QuestionCreateProps = {
  id: number;
  questionNumber: number;
  onDelete: Function;
  updateQuestion: (question: Question) => void;
};

const QuestionCreate = ({ id, questionNumber, onDelete, updateQuestion }: QuestionCreateProps) => {
  const [selectedValue, setSelectedValue] = useState(QuestionType.OPEN);

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };

  return (
    <Card title={`Question ${questionNumber}`} onDelete={onDelete}>
      <div className="text-left mr-auto">
        <SingleDropdownButton
          onChange={handleSingleChoice}
          options={options}
          defaultValue={options[3]}
          className={styles.dropdownButton}
          label={'Question type'}
        />
      </div>
      {selectedValue === QuestionType.DROPDOWN && (
        <DropdownQuestionCreate id={id} updateQuestion={updateQuestion} />
      )}
      {selectedValue === QuestionType.LINEAR_SCALE && (
        <LinearScaleQuestionCreate id={id} updateQuestion={updateQuestion} />
      )}
      {selectedValue === QuestionType.MULTI_CHOICE && (
        <MultiChoiceQuestionCreate id={id} updateQuestion={updateQuestion} />
      )}
      {selectedValue === QuestionType.OPEN && (
        <OpenQuestionCreate id={id} updateQuestion={updateQuestion} />
      )}
      {selectedValue === QuestionType.YES_OR_NO && (
        <YesOrNoQuestionCreate id={id} updateQuestion={updateQuestion} />
      )}
    </Card>
  );
};

export default QuestionCreate;
