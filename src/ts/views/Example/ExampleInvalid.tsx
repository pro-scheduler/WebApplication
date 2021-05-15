import React from 'react';
import { useState } from 'react';
import MultiDropdownButton from '../../components/common/Dropdown/MultiDropdownButton';
import SingleDropdownButton from '../../components/common/Dropdown/SingleDropdownButton';
import SingleValueInput from '../../components/common/forms/Input/SingleValueInput';
import ArrowButton from '../../components/common/RoundButtons/ArrowButton';
import CalendarButton from '../../components/common/RoundButtons/CalendarButton';
import PlusButton from '../../components/common/RoundButtons/PlusButton';
import SwitchButton from '../../components/common/SwitchButton/SwitchButton';
import TextArea from '../../components/common/forms/TextArea/TextArea';
import styles from './Example.module.css';

const Example = () => {
  const [showText, setShowText] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const setTextInpuValue = (event: any) => {
    return null;
  };

  const handleMultiChoice = (option: any) => {
    setSelectedValues(option);
  };

  const handleSingleChoice = ({ value, label }: any) => {
    setSelectedValue(value);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const values = selectedValues.map((option: any) => {
    return <p key={option.value}>{option.value}</p>;
  });

  return (
    <div className={styles.example}>
      <SwitchButton
        className={styles.switchButton}
        onChange={() => setShowText(!showText)}
        title={'Example of disabled switches and ivalid inputs'}
      />
      {showText ? <p>Switch on</p> : <p>Switch off</p>}
      <ArrowButton onclick={() => console.log('Arrow clicked')} className="" />
      <p />
      <PlusButton onclick={() => console.log('Plus clicked')} className={styles.plus} />
      <p />
      <CalendarButton onclick={() => console.log('Calendar clicked')} className={styles.calendar} />
      <p />

      <p>Multichoice</p>
      <MultiDropdownButton
        onchange={handleMultiChoice}
        options={options}
        defaultValue={null}
        invalid={true}
        invalidText="Please select at least one option"
      />
      {values}

      <p className="mt-5">Singlechoice</p>
      <SingleDropdownButton
        onchange={handleSingleChoice}
        options={options}
        defaultValue={options[0]}
        invalid={true}
        invalidText="Please select proper value"
      />
      {selectedValue}
      <p />
      <p>Text Input</p>
      <SingleValueInput
        label="textInputLabel"
        valueHandler={setTextInpuValue}
        invalid={true}
        invalidText="To short name"
      />
      <p>Text Area</p>
      <TextArea
        label="textAreaLabel"
        valueHandler={setTextInpuValue}
        className={null}
        invalid={true}
        invalidText="You need apply 15-30 words"
      />
    </div>
  );
};

export default Example;
