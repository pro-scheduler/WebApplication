import styles from './SingleValueInput.module.css';
import { useState } from 'react';
import { Validation, handleValidation } from '../../../../tools/validator';

export type SingleValueInputProps = {
  label?: string;
  valueHandler: Function;
  setInvalid?: Function;
  required?: boolean;
  validation?: Validation[];
  initialInvalidState?: boolean;
};

const SingleValueInput = ({
  label,
  valueHandler,
  required,
  setInvalid,
  validation,
  initialInvalidState,
}: SingleValueInputProps) => {
  const [state, setState] = useState<string>('');
  const [invalidInner, setInvalidInner] = useState<boolean | undefined>(initialInvalidState);
  const [invalidMessage, setInvalidMessage] = useState<string>('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
    let valid;
    if (validation !== undefined) {
      valid = handleValidation(validation, event.target.value, setInvalidMessage);
    }
    if (setInvalid !== undefined) {
      setInvalid(!valid);
    }
    setInvalidInner(!valid);
  };

  return (
    <>
      <div className={styles.label_classic}>
        {label} {required && '*'}
      </div>
      <input
        className={invalidInner ? styles.input_classic_invalid : styles.input_classic}
        type="text"
        value={state}
        onChange={handleChange}
      />
      {invalidMessage && invalidInner && (
        <div className={styles.invalid_text}>{invalidMessage}</div>
      )}
    </>
  );
};

export default SingleValueInput;
