import SingleValueInput from '../../components/common/forms/Input/SingleValueInput';
import styles from './Example.module.css';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import { useState } from 'react';
import { minSings, maxSings, required } from '../../tools/validator';
import TextArea from '../../components/common/forms/TextArea/TextArea';

const ExampleValidation = () => {
  const [name, setName] = useState('');
  const [descritpion, setDescription] = useState('');
  const [invalidName, setIvalidName] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  return (
    <div className={styles.example} style={{ padding: 30 }}>
      <SingleValueInput
        label="Name"
        valueHandler={setName}
        setInvalid={setIvalidName}
        required={true}
        validation={[
          { validation: required, message: 'This field is required' },
          { validation: minSings(3), message: 'Min 3 signs required' },
        ]}
      />
      <TextArea
        label="textAreaLabel"
        valueHandler={setDescription}
        required={true}
        setInvalid={setInvalidDescription}
        validation={[
          { validation: maxSings(256), message: 'Max 256 signs' },
          { validation: minSings(20), message: 'Min 20 signs' },
        ]}
      />
      <div style={{ margin: 20 }}>
        <ActionButton
          text="Submit"
          onclick={() => console.log('Action clicked')}
          className="button"
          disabled={
            invalidName || invalidDescription || !required()(name) || !required()(descritpion)
          }
        />
      </div>
    </div>
  );
};

export default ExampleValidation;
