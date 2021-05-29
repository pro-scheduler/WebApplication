import styles from './SingleValueInput.module.css';
import { useState } from 'react';
import cx from 'classnames';
import { Validation, handleValidation } from '../../../../tools/validator';

export type SingleValueInputProps = {
  label?: string;
  valueHandler: Function;
  className?: string;
  setInvalid?: Function;
  required?: boolean;
  validation?: Validation[];
  initialInvalidState?: boolean;
};

const SingleValueInput = ({
  label,
  valueHandler,
  className,
  required,
  setInvalid,
  validation,
  initialInvalidState,
}: SingleValueInputProps) => {
  const [state, setState] = useState<string>('');
  const [invalidInner, setInvalidInner] = useState<boolean | undefined>(initialInvalidState);
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const inputStyles = cx(
    invalidInner ? styles.input_classic_invalid : styles.input_classic,
    className
  );

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
    let valid = true;
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
      <input className={inputStyles} type="text" value={state} onChange={handleChange} />
      {invalidMessage && invalidInner && (
        <div className={styles.invalid_text}>{invalidMessage}</div>
      )}
    </>
  );
};

export default SingleValueInput;
