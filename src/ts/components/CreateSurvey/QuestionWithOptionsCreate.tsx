import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import mainStyles from './QuestionWithOptionsCreate.module.css';
import Col from 'react-bootstrap/Col';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import { BsCircle } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import PlusButton from '../common/RoundButtons/PlusButton';
import { Question, Type } from '../../model/survey/Question';
import { BasicQuestionCreateProps } from './BasicQuestionCreate';

const QuestionWithOptionsCreate = ({ id, type, updateQuestion }: BasicQuestionCreateProps) => {
  const [question, setQuestion] = useState<Question>(
    type === Type.MULTI_CHOICE
      ? {
          id: id,
          question: '',
          type: type,
          possibleChoices: [],
        }
      : {
          id: id,
          question: '',
          type: type,
          possibleOptions: [],
        }
  );
  const [currentOption, setCurrentOption] = useState('');
  const [options, setOptions] = useState<any[]>([]);

  const addOption = () => {
    if (currentOption !== '' && !options.includes(currentOption)) {
      const newOptions = [...options, currentOption];
      setOptions(newOptions);
      if (type === Type.MULTI_CHOICE) question.possibleChoices = newOptions;
      else {
        question.possibleOptions = newOptions;
      }
      setQuestion(question);
    }
    setCurrentOption('');
  };

  const deleteOption = (optionToDelete: any) => {
    const newOptions = options.filter((option: any) => option !== optionToDelete);
    setOptions(newOptions);
    if (type === Type.MULTI_CHOICE) question.possibleChoices = newOptions;
    else {
      question.possibleOptions = newOptions;
    }
    setQuestion(question);
    updateQuestion(question);
  };

  const handleQuestionChange = (value: string) => {
    question.question = value;
    setQuestion(question);
    updateQuestion(question);
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
      <Col lg={8} className="text-left mt-4">
        <div className={mainStyles.optionsText}>Options:</div>
        {options.map((option: any) => (
          <div className="mt-2" key={option}>
            <BsCircle className="mr-2" /> {option}
            <TiDelete
              className={mainStyles.removeOptionButton}
              onClick={() => deleteOption(option)}
            />
          </div>
        ))}
        <div className="mt-3">
          <SingleValueInput valueHandler={setCurrentOption} />
          <PlusButton onclick={addOption} className={mainStyles.addOptionButton} />
        </div>
      </Col>
    </>
  );
};

export default QuestionWithOptionsCreate;
