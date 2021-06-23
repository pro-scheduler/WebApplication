import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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

const options = [
  new ValueLabelPair(QuestionType.DROPDOWN, 'Dropdown'),
  new ValueLabelPair(QuestionType.LINEAR_SCALE, 'Linear Scale'),
  new ValueLabelPair(QuestionType.MULTI_CHOICE, 'MultiChoice'),
  new ValueLabelPair(QuestionType.OPEN, 'Open'),
  new ValueLabelPair(QuestionType.YES_OR_NO, 'Yes or No'),
];

export type QuestionCreateProps = {
  id: number;
  deleteButton: JSX.Element;
  updateQuestion: (question: Question) => void;
};

const QuestionCreate = ({ id, deleteButton, updateQuestion }: QuestionCreateProps) => {
  const [selectedValue, setSelectedValue] = useState(QuestionType.OPEN);

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Col xs={8} sm={8} lg={10} className={styles.questionField}>
        <Row>
          <Col lg={12} className="text-right mt-sm-0">
            {deleteButton}
          </Col>
          <Col xs={8} sm={6} lg={4} className="text-right mr-0 mt-4 mb-5">
            <SingleDropdownButton
              onChange={handleSingleChoice}
              options={options}
              defaultValue={options[3]}
              className={styles.dropdownButton}
            />
          </Col>
          <Col lg={11} className={styles.questionCreateFooter} />
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
        </Row>
      </Col>
    </>
  );
};

export default QuestionCreate;
