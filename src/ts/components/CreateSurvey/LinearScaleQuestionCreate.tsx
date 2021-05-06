import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import Col from 'react-bootstrap/Col';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';
import { useDispatch } from 'react-redux';
import LinearScaleQuestion from '../../model/survey/question/types/LinearScaleQuestion';
import allActions from '../../actions';
import { optionToValueLabelPair } from '../../model/utils/ValueLabelPair';

const linearScaleFromOptions = Array.from({ length: 2 }, (_, i) => optionToValueLabelPair(i));

const linearScaleToOptions = Array.from({ length: 9 }, (_, i) => optionToValueLabelPair(i + 2));

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
      <Col lg={12} className="text-left">
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
