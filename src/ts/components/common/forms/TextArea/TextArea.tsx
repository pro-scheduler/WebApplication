import styles from './TextArea.module.css';
import { useState } from 'react';
import cx from 'classnames';
import { Validation, handleValidation } from '../../../../tools/validator';

export type TextAreaProps = {
  label?: string;
  valueHandler: Function;
  className?: string;
  setInvalid?: Function;
  required?: boolean;
  validation?: Validation[];
  initialInvalidState?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
};

const TextArea = ({
  label,
  valueHandler,
  className,
  setInvalid,
  required,
  validation,
  initialInvalidState,
  value,
  defaultValue,
  placeholder,
  disabled,
}: TextAreaProps) => {
  const [invalidInner, setInvalidInner] = useState<boolean | undefined>(initialInvalidState);
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const textAreaStyles = cx(
    invalidInner ? styles.text_area_classic_invalid : styles.text_area_classic,
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
      <div className={styles.label_classic} style={{ marginBottom: label ? 10 : 0 }}>
        {label} {required && '*'}
      </div>
      <textarea
        className={textAreaStyles}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{ width: '100%', ...(disabled ? { color: 'gray' } : {}) }}
        disabled={disabled}
      />
      {invalidMessage && invalidInner && (
        <div className={styles.invalid_text}>{invalidMessage}</div>
      )}
    </>
  );
};

export default TextArea;
