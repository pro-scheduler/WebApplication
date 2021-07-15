import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import mainStyles from './QuestionWithOptionsCreate.module.css';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import { BsCircle } from 'react-icons/bs';
import PlusButton from '../common/RoundButtons/PlusButton';
import { Question, QuestionType } from '../../model/survey/Question';
import { BasicQuestionCreateProps } from './BasicQuestionCreate';
import DeleteButton from '../common/SubmitButton/ActionButton/DeleteButton';

const QuestionWithOptionsCreate = ({ id, type, updateQuestion }: BasicQuestionCreateProps) => {
  const [question, setQuestion] = useState<Question>(
    type === QuestionType.MULTI_CHOICE
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
      if (type === QuestionType.MULTI_CHOICE) question.possibleChoices = newOptions;
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
    if (type === QuestionType.MULTI_CHOICE) question.possibleChoices = newOptions;
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
      <div className="mt-3">
        <TextArea
          label="Question description"
          valueHandler={handleQuestionChange}
          className={styles.questionTextArea}
          placeholder={'Please type question ...'}
        />
      </div>
      <div className="mt-3">
        <div className={mainStyles.optionsText}>Options:</div>
      </div>
      {options.map((option: any) => (
        <div className={mainStyles.option} key={option}>
          <BsCircle className={mainStyles.circle} /> {option}
          <DeleteButton onDelete={() => deleteOption(option)} className={mainStyles.deleteButton} />
        </div>
      ))}
      <div className={mainStyles.optionInput}>
        <SingleValueInput
          value={currentOption}
          valueHandler={setCurrentOption}
          placeholder={'Please type option ...'}
        />
        <PlusButton onclick={addOption} className={mainStyles.addOptionButton} />
      </div>
    </>
  );
};

export default QuestionWithOptionsCreate;
