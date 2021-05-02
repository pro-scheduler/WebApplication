import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './QuestionField.module.css';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';
import React, { useState } from 'react';
import LinearScaleQuestionCreate from './LinearScaleQuestionCreate';
import OpenQuestionCreate from './OpenQuestionCreate';
import YesOrNoQuestionCreate from './YesOrNoQuestionCreate';

const options = [
  { value: 'DropdownQuestion', label: 'Dropdown' },
  { value: 'LinearScaleQuestion', label: 'Linear Scale' },
  { value: 'MultiChoiceQuestion', label: 'Multi Choice' },
  { value: 'OpenQuestion', label: 'Open' },
  { value: 'YesOrNoQuestion', label: 'Yes or No' },
];

const QuestionField = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Col lg={12} className={styles.questionField}>
        <Row>
          <Col lg={4} className="text-right mt-4">
            <SingleDropdownButton
              onchange={handleSingleChoice}
              options={options}
              defaultValue={options[0]}
              className="mr-0"
            />
          </Col>
          {selectedValue === options[1].value && <LinearScaleQuestionCreate />}
          {selectedValue === options[3].value && <OpenQuestionCreate />}
          {selectedValue === options[4].value && <YesOrNoQuestionCreate />}
        </Row>
      </Col>
    </>
  );
};

export default QuestionField;
