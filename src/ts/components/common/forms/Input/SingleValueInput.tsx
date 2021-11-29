import styles from './SingleValueInput.module.css';
import { useState } from 'react';
import cx from 'classnames';
import { Validation, handleValidation } from '../../../../tools/validator';
import { KeyboardEventHandler } from 'react-select';

export type SingleValueInputProps = {
  label?: string;
  valueHandler: Function;
  className?: string;
  setInvalid?: Function;
  validation?: Validation[];
  initialInvalidState?: boolean;
  placeholder?: string;
  value?: string | number;
  handleKeyDown?: KeyboardEventHandler;
  type?: 'text' | 'number';
  minValue?: number;
  disabled?: boolean;
};

const SingleValueInput = ({
  label,
  valueHandler,
  className,
  setInvalid,
  validation,
  initialInvalidState,
  placeholder,
  value,
  handleKeyDown,
  type = 'text',
  minValue,
  disabled = false,
}: SingleValueInputProps) => {
  const [invalidInner, setInvalidInner] = useState<boolean | undefined>(initialInvalidState);
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const inputStyles = cx(
    invalidInner ? styles.input_classic_invalid : styles.input_classic,
    className
  );

  const handleChange = (event: any) => {
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
      <div className={styles.label_classic}>{label}</div>
      <input
        className={inputStyles}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        style={{ width: '100%' }}
        onKeyDown={handleKeyDown}
        min={minValue}
        disabled={disabled}
      />
      {invalidMessage && invalidInner && (
        <div className={styles.invalid_text}>{invalidMessage}</div>
      )}
    </>
  );
};

export default SingleValueInput;
