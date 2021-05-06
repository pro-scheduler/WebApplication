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
import { Type } from '../../model/survey/question/Question';

const options = [
  new ValueLabelPair(Type.DROPDOWN, 'Dropdown'),
  new ValueLabelPair(Type.LINEAR_SCALE, 'Linear Scale'),
  new ValueLabelPair(Type.MULTI_CHOICE, 'MultiChoice'),
  new ValueLabelPair(Type.OPEN, 'Open'),
  new ValueLabelPair(Type.YES_OR_NO, 'Yes or No'),
];

interface IQuestionCreate {
  id: number;
  deleteButton: JSX.Element;
}

const QuestionCreate = ({ id, deleteButton }: IQuestionCreate) => {
  const [selectedValue, setSelectedValue] = useState(Type.OPEN);

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Col sm={8} lg={10} className={styles.questionField}>
        <Row>
          <Col lg={12} className="text-right mt-sm-0">
            {deleteButton}
          </Col>
          <Col sm={6} lg={12} className="text-right my-sm-4">
            <SingleDropdownButton
              onchange={handleSingleChoice}
              options={options}
              defaultValue={options[3]}
              className="mr-0"
            />
          </Col>
          <Col lg={11} className={styles.questionCreateFooter} />
          {selectedValue === Type.DROPDOWN && <DropdownQuestionCreate id={id} />}
          {selectedValue === Type.LINEAR_SCALE && <LinearScaleQuestionCreate id={id} />}
          {selectedValue === Type.MULTI_CHOICE && <MultiChoiceQuestionCreate id={id} />}
          {selectedValue === Type.OPEN && <OpenQuestionCreate id={id} />}
          {selectedValue === Type.YES_OR_NO && <YesOrNoQuestionCreate id={id} />}
        </Row>
      </Col>
    </>
  );
};

export default QuestionCreate;
