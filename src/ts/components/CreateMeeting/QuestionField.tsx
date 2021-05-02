import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './QuestionField.module.css';
import SingleDropdownButton from '../common/Dropdown/SingleDropdownButton';
import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';

const options = [
  { value: 'DropdownQuestion', label: 'Dropdown' },
  { value: 'LinearScaleQuestion', label: 'Linear Scale' },
  { value: 'MultiChoiceQuestion', label: 'Multi Choice' },
  { value: 'OpenQuestion', label: 'Open' },
  { value: 'YesOrNoQuestion', label: 'Yes or No' },
];

const QuestionField = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [question, setQuestion] = useState('');

  const handleSingleChoice = ({ value, _ }: any) => {
    setSelectedValue(value);
  };
  return (
    <>
      <Col lg={12} className={styles.questionField}>
        <Row>
          <Col lg={6} className="text-left">
            <TextArea
              label="Question"
              valueHandler={setQuestion}
              className={styles.questionTextArea}
            />
          </Col>
          <Col lg={6} className="text-right mt-4">
            <SingleDropdownButton
              onchange={handleSingleChoice}
              options={options}
              defaultValue={options[0]}
              className="mr-0"
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default QuestionField;
