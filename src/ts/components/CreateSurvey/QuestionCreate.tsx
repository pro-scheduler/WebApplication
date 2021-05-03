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

const options = [
  { value: 'DropdownQuestion', label: 'Dropdown' },
  { value: 'LinearScaleQuestion', label: 'Linear Scale' },
  { value: 'MultiChoiceQuestion', label: 'Multi Choice' },
  { value: 'OpenQuestion', label: 'Open' },
  { value: 'YesOrNoQuestion', label: 'Yes or No' },
];

interface IQuestionCreate {
  id: number;
  deleteButton: JSX.Element;
}

const QuestionCreate = ({ id, deleteButton }: IQuestionCreate) => {
  const [selectedValue, setSelectedValue] = useState('OpenQuestion');

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Col lg={12} className={styles.questionField}>
        <Row>
          <Col sm={6} lg={11} className="text-right mt-2">
            <SingleDropdownButton
              onchange={handleSingleChoice}
              options={options}
              defaultValue={options[3]}
              className="mr-0"
            />
          </Col>
          <Col sm={6} lg={1} className="text-right ml-0 pl-1">
            {deleteButton}
          </Col>
          {selectedValue === options[0].value && <DropdownQuestionCreate id={id} />}
          {selectedValue === options[1].value && <LinearScaleQuestionCreate id={id} />}
          {selectedValue === options[2].value && <MultiChoiceQuestionCreate id={id} />}
          {selectedValue === options[3].value && <OpenQuestionCreate id={id} />}
          {selectedValue === options[4].value && <YesOrNoQuestionCreate id={id} />}
        </Row>
      </Col>
    </>
  );
};

export default QuestionCreate;
