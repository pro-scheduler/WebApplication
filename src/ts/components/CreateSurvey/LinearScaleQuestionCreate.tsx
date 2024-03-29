import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import linearStyles from './LinearScaleQuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';
import { optionToValueLabelPair } from '../../model/utils/ValueLabelPair';
import { Question, QuestionType } from '../../model/survey/Question';
import { TypedQuestionCreateProps } from './DropdownQuestionCreate';
import Row from 'react-bootstrap/Row';

const linearScaleFromOptions = Array.from({ length: 2 }, (_, i) => optionToValueLabelPair(i));

const linearScaleToOptions = Array.from({ length: 9 }, (_, i) => optionToValueLabelPair(i + 2));

const LinearScaleQuestionCreate = ({ id, updateQuestion }: TypedQuestionCreateProps) => {
  const [question, setQuestion] = useState<Question>({
    id: id,
    type: QuestionType.LINEAR_SCALE,
    question: '',
    fromValue: 0,
    toValue: 10,
  });

  const handleFromValueChange = ({ value, _ }: any) => {
    question.fromValue = value;
    setQuestion(question);
    updateQuestion(question);
  };

  const handleToValueChange = ({ value, _ }: any) => {
    question.toValue = value;
    setQuestion(question);
    updateQuestion(question);
  };

  const handleQuestionChange = (value: string) => {
    question.question = value;
    setQuestion(question);
    updateQuestion(question);
  };

  return (
    <>
      <div className="mt-3">
        <TextArea
          label="Question description"
          valueHandler={handleQuestionChange}
          className={styles.questionTextArea}
          placeholder={'Please type question ...'}
        />
      </div>
      <Row>
        <Col lg={12} className="mt-3">
          <div className={linearStyles.scaleLabel}>Scale</div>
        </Col>
        <Col lg={2} className="text-center">
          <SingleDropdownButton
            onChange={handleFromValueChange}
            options={linearScaleFromOptions}
            defaultValue={linearScaleFromOptions[0]}
            className={linearStyles.dropdown}
          />
        </Col>

        <Col lg={1} className="text-center mt-2 pt-2">
          {' '}
          to{' '}
        </Col>

        <Col lg={2} className="text-center">
          <SingleDropdownButton
            onChange={handleToValueChange}
            options={linearScaleToOptions}
            defaultValue={linearScaleToOptions[8]}
            className={linearStyles.dropdown}
          />
        </Col>
      </Row>
    </>
  );
};

export default LinearScaleQuestionCreate;
