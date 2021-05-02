import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import './DropdownQuestionCreate.css';
import Col from 'react-bootstrap/Col';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import { BsCircle } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import PlusButton from '../common/RoundButtons/PlusButton';

const DropdownQuestionCreate = () => {
  const [question, setQuestion] = useState('');
  const [currentOption, setCurrentOption] = useState('');
  const [options, setOptions] = useState<any[]>([]);

  const addValue = () => {
    if (currentOption !== '' && !options.includes(currentOption)) {
      setOptions([...options, currentOption]);
    }
    setCurrentOption('');
  };

  const deleteOption = (optionToDelete: any) => {
    setOptions(options.filter((option: any) => option !== optionToDelete));
  };

  return (
    <>
      <Col lg={8} className="text-left">
        <TextArea label="Question" valueHandler={setQuestion} className={styles.questionTextArea} />
      </Col>
      <Col lg={8} className="text-left mt-4">
        <div className="mb-3">Options:</div>
        {options.map((option: any) => (
          <div className="mt-2">
            <BsCircle className="mr-2" /> {option}
            <TiDelete className="ml-2 removeOptionButton" onClick={() => deleteOption(option)} />
          </div>
        ))}
        <div className="mt-5">
          <SingleValueInput label="" valueHandler={setCurrentOption} />
          <PlusButton onclick={addValue} className={'ml-3 addOptionButton'} />
        </div>
      </Col>
    </>
  );
};

export default DropdownQuestionCreate;
