import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea/TextArea';
import styles from './QuestionCreate.module.css';
import './QuestionWithOptionsCreate.css';
import Col from 'react-bootstrap/Col';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import { BsCircle } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import PlusButton from '../common/RoundButtons/PlusButton';
import { useDispatch } from 'react-redux';
import Question from '../../model/survey/question/Question';
import allActions from '../../actions';
import MultiChoiceQuestion from '../../model/survey/question/types/MultiChoiceQuestion';
import DropdownQuestion from '../../model/survey/question/types/DropdownQuestion';

interface IQuestionCreate {
  id: number;
  type: string;
}

const QuestionWithOptionsCreate = ({ id, type }: IQuestionCreate) => {
  const dispatch: Function = useDispatch();
  const [question, setQuestion] = useState('');
  const [currentOption, setCurrentOption] = useState('');
  const [options, setOptions] = useState<any[]>([]);

  const addOption = () => {
    if (currentOption !== '' && !options.includes(currentOption)) {
      const newOptions = [...options, currentOption];
      setOptions(newOptions);
      save(question, newOptions);
    }
    setCurrentOption('');
  };

  const deleteOption = (optionToDelete: any) => {
    const newOptions = options.filter((option: any) => option !== optionToDelete);
    setOptions(newOptions);
    save(question, newOptions);
  };

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
    save(value, options);
  };

  const save = (value: string, possibleOptions: string[]) => {
    const questionWithOptions: Question =
      type === 'multiChoice'
        ? new MultiChoiceQuestion(value, possibleOptions, id)
        : new DropdownQuestion(value, possibleOptions, id);
    dispatch(allActions.surveyActions.addQuestionToSurveyWithQuestionsDTO(questionWithOptions));
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
        <div className="mb-3 optionsText">Options:</div>
        {options.map((option: any) => (
          <div className="mt-2" key={option}>
            <BsCircle className="mr-2" /> {option}
            <TiDelete className="ml-2 removeOptionButton" onClick={() => deleteOption(option)} />
          </div>
        ))}
        <div className="mt-3">
          <SingleValueInput label="" valueHandler={setCurrentOption} />
          <PlusButton onclick={addOption} className={'ml-3 addOptionButton'} />
        </div>
      </Col>
    </>
  );
};

export default QuestionWithOptionsCreate;
