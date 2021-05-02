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

const QuestionCreate = () => {
  const [selectedValue, setSelectedValue] = useState('OpenQuestion');

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Col lg={12} className={styles.questionField}>
        <Row>
          <Col lg={12} className="text-right mt-2">
            <SingleDropdownButton
              onchange={handleSingleChoice}
              options={options}
              defaultValue={options[3]}
              className="mr-0"
            />
          </Col>
          {selectedValue === options[0].value && <DropdownQuestionCreate />}
          {selectedValue === options[1].value && <LinearScaleQuestionCreate />}
          {selectedValue === options[2].value && <MultiChoiceQuestionCreate />}
          {selectedValue === options[3].value && <OpenQuestionCreate />}
          {selectedValue === options[4].value && <YesOrNoQuestionCreate />}
        </Row>
      </Col>
    </>
  );
};

export default QuestionCreate;
