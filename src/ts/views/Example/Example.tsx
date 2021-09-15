import { useState } from 'react';
import MultiDropdownButton from '../../components/common/Dropdown/MultiDropdownButton';
import SingleDropdownButton from '../../components/common/Dropdown/SingleDropdownButton';
import SingleValueInput from '../../components/common/forms/Input/SingleValueInput';
import CalendarIcon from '../../components/common/Icons/CalendarIcon';
import LocationIcon from '../../components/common/Icons/LocationIcon';
import PencilIcon from '../../components/common/Icons/PencilIcon';
import SurveyIcon from '../../components/common/Icons/SurveyIcon';
import WorldIcon from '../../components/common/Icons/WorldIcon';
import ArrowButton from '../../components/common/RoundButtons/ArrowButton';
import CalendarButton from '../../components/common/RoundButtons/CalendarButton';
import PlusButton from '../../components/common/RoundButtons/PlusButton';
import SwitchButton from '../../components/common/SwitchButton/SwitchButton';
import TextArea from '../../components/common/forms/TextArea/TextArea';
import styles from './Example.module.css';
import SearchGeocoder from '../../components/common/Map/SearchGeocoder/SearchGeocoder';

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

  const handleSingleChoice = ({ value, _ }: any) => {
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
      <ArrowButton onclick={() => console.log('Arrow clicked')} />
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
      <MultiDropdownButton onChange={handleMultiChoice} options={options} />
      {values}

      <p className="mt-5">Singlechoice</p>
      <SingleDropdownButton
        onChange={handleSingleChoice}
        options={options}
        defaultValue={options[0]}
      />
      {selectedValue}
      <p />
      <p>Text Input</p>
      <SingleValueInput label="textInputLabel" valueHandler={setTextInpuValue} />
      <p>Text Area</p>
      <TextArea label="textAreaLabel" valueHandler={setTextInpuValue} />
      <SearchGeocoder setSelectedPlace={() => {}} />
    </div>
  );
};

export default Example;
