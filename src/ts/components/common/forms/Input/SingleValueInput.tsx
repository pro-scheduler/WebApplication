import styles from './SingleValueInput.module.css';
import { useState } from 'react';

interface SingleValueInputProps {
  label: string;
  valueHandler: Function;
  invalid?: boolean;
  invalidText?: string;
}

const SingleValueInput = ({ label, valueHandler, invalid, invalidText }: SingleValueInputProps) => {
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label_classic}>{label}</div>
        <input
          className={invalid ? styles.input_classic_invalid : styles.input_classic}
          type="text"
          value={state}
          onChange={handleChange}
        />
        {invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
      </div>
    </>
  );
};

export default SingleValueInput;
