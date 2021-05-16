import styles from './TextArea.module.css';
import { useState } from 'react';
import cx from 'classnames';
export type TextAreaProps = {
  label: string;
  valueHandler: Function;
  className?: string;
  invalid?: boolean;
  invalidText?: string;
};

const TextArea = ({ label, valueHandler, className, invalid, invalidText }: TextAreaProps) => {
  const textAreaStyles = cx(
    invalid ? styles.text_area_classic_invalid : styles.text_area_classic,
    className
  );
  const [state, setState] = useState<string>('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <>
      <div className={styles.label_classic}>{label}</div>
      <textarea className={textAreaStyles} value={state} onChange={handleChange} />
      {invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </>
  );
};

export default TextArea;
