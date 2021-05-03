import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';
import { useDispatch } from 'react-redux';
import LinearScaleQuestion from '../../model/survey/question/types/LinearScaleQuestion';
import allActions from '../../actions';

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

interface IQuestionCreate {
  id: number;
}

const LinearScaleQuestionCreate = ({ id }: IQuestionCreate) => {
  const dispatch: Function = useDispatch();
  const [question, setQuestion] = useState('');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(10);

  const handleFromValueChange = ({ value, _ }: any) => {
    setFromValue(value);
    save(value, toValue, question);
  };

  const handleToValueChange = ({ value, _ }: any) => {
    setToValue(value);
    save(fromValue, value, question);
  };

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
    save(fromValue, toValue, value);
  };

  const save = (from: number, to: number, value: string) => {
    const linearScaleQuestion = new LinearScaleQuestion(value, from, to, id);
    dispatch(allActions.surveyActions.addQuestionToSurveyWithQuestionsDTO(linearScaleQuestion));
  };

  return (
    <>
      <Col lg={8} className="text-left">
        <TextArea
          label="Question"
          valueHandler={handleQuestionChange}
          className={styles.questionTextArea}
        />
      </Col>
      <Col lg={5} className="text-center mt-5">
        <SingleDropdownButton
          onchange={handleFromValueChange}
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
          onchange={handleToValueChange}
          options={linearScaleToOptions}
          defaultValue={linearScaleToOptions[8]}
          className="mx-auto"
        />
      </Col>
    </>
  );
};

export default LinearScaleQuestionCreate;
