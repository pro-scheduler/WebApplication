import React from 'react';
import { useState } from 'react';
import MultiDropdownButton from '../../components/common/Dropdown/MultiDropdownButton';
import SingleDropdownButton from '../../components/common/Dropdown/SingleDropdownButton';
import CalendarIcon from '../../components/common/Icons/CalendarIcon';
import LocationIcon from '../../components/common/Icons/LocationIcon';
import PencilIcon from '../../components/common/Icons/PencilIcon';
import SurveyIcon from '../../components/common/Icons/SurveyIcon';
import WorldIcon from '../../components/common/Icons/WorldIcon';
import ArrowButton from '../../components/common/RoundButtons/ArrowButton';
import CalendarButton from '../../components/common/RoundButtons/CalendarButton';
import PlusButton from '../../components/common/RoundButtons/PlusButton';
import SwitchButton from '../../components/common/SwitchButton/SwitchButton';

import styles from './Example.module.css';

const Example = () => {
  const [showText, setShowText] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

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
        title={'Example switch'}
      />
      {showText ? <p>Switch on</p> : <p>Switch off</p>}
      <ArrowButton onclick={() => console.log('Arrow clicked')} className="" />
      <p />
      <PlusButton onclick={() => console.log('Plus clicked')} className={styles.plus} />
      <p />
      <CalendarButton onclick={() => console.log('Calendar clicked')} className={styles.calendar} />
      <p />

      <PencilIcon className={styles.icon} />
      <CalendarIcon />
      <LocationIcon className={styles.icon} />
      <WorldIcon />
      <SurveyIcon className={styles.icon} />

      <p>Multichoice</p>
      <MultiDropdownButton onchange={handleMultiChoice} options={options} defaultValue={null} />
      {values}

      <p className="mt-5">Singlechoice</p>
      <SingleDropdownButton
        onchange={handleSingleChoice}
        options={options}
        defaultValue={options[0]}
      />
      {selectedValue}
      <p />
    </div>
  );
};

export default Example;
