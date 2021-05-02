import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';

const linearScaleFromOptions = [
  { value: 0, label: 0 },
  { value: 1, label: 1 },
];

const linearScaleToOptions = [
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
];

const LinearScaleQuestionCreate = () => {
  const [question, setQuestion] = useState('');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(10);

  const handleFromValueChoice = ({ value, _ }: any) => {
    setFromValue(value);
  };

  const handleToValueChoice = ({ value, _ }: any) => {
    setToValue(value);
  };

  return (
    <>
      <Col lg={8} className="text-left">
        <TextArea label="Question" valueHandler={setQuestion} className={styles.questionTextArea} />
      </Col>
      <Col lg={5} className="text-center mt-5">
        <SingleDropdownButton
          onchange={handleFromValueChoice}
          options={linearScaleFromOptions}
          defaultValue={linearScaleFromOptions[0]}
          className="mx-auto"
        />
      </Col>

      <Col lg={2} className="text-center mt-5 pt-2">
        {' '}
        to{' '}
      </Col>

      <Col lg={5} className="text-center mt-5">
        <SingleDropdownButton
          onchange={handleToValueChoice}
          options={linearScaleToOptions}
          defaultValue={linearScaleToOptions[8]}
          className="mx-auto"
        />
      </Col>
    </>
  );
};

export default LinearScaleQuestionCreate;
