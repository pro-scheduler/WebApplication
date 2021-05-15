import { useState } from 'react';
import MultiDropdownButton from '../../components/common/Dropdown/MultiDropdownButton';
import SingleDropdownButton from '../../components/common/Dropdown/SingleDropdownButton';
import SingleValueInput from '../../components/common/forms/Input/SingleValueInput';
import ArrowButton from '../../components/common/RoundButtons/ArrowButton';
import CalendarButton from '../../components/common/RoundButtons/CalendarButton';
import PlusButton from '../../components/common/RoundButtons/PlusButton';
import TextArea from '../../components/common/forms/TextArea/TextArea';
import styles from './Example.module.css';
import RedirectButton from '../../components/common/SubmitButton/RedirectButton/RedirectButton';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import FacebookButton from '../../components/common/SubmitButton/IconButton/FacebookButton';
import GoogleButton from '../../components/common/SubmitButton/IconButton/GoogleButton';

const Example = () => {
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
    <div className={styles.example} style={{ padding: 30 }}>
      <p>
        Example of disabled switches and ivalid inputs (Note that validation here is just view,
        lables are just example)
      </p>
      Normal:
      <GoogleButton redirectTo="/invalid" text="Sign in with Google" className="my-2" />
      <FacebookButton redirectTo="/invalid" text="Sign in with Facebook" className="mt-4" />
      <br />
      Disabled:
      <GoogleButton redirectTo="/signup" text="Sign in with Google" disabled={true} />
      <br />
      <FacebookButton redirectTo="/signup" text="Sign in with Facebook" disabled={true} />
      <div style={{ margin: 20 }}>
        <RedirectButton text="Redirect" disabled={true} redirectTO="/create" />
      </div>
      <div style={{ margin: 20 }}>
        <ActionButton
          text="Submit"
          onclick={() => console.log('Action clicked')}
          className="button"
          disabled={true}
        />
      </div>
      <ArrowButton onclick={() => console.log('Arrow clicked')} disabled={true} />
      <p />
      <PlusButton
        onclick={() => console.log('Plus clicked')}
        className={styles.plus}
        disabled={true}
      />
      <p />
      <CalendarButton
        onclick={() => console.log('Calendar clicked')}
        className={styles.calendar}
        disabled={true}
      />
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
