import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionField.module.css';
import Col from 'react-bootstrap/Col';

const OpenQuestionCreate = () => {
  const [question, setQuestion] = useState('');

  return (
    <>
      <Col lg={8} className="text-left">
        <TextArea label="Question" valueHandler={setQuestion} className={styles.questionTextArea} />
      </Col>
    </>
  );
};

export default OpenQuestionCreate;
