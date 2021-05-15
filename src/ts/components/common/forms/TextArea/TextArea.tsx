import styles from './TextArea.module.css';
import { useState } from 'react';
import cx from 'classnames';
interface TextAreaProps {
  label: string;
  valueHandler: Function;
  className?: any;
  invalid?: boolean;
  invalidText?: string;
}
const TextArea = ({ label, valueHandler, className, invalid, invalidText }: TextAreaProps) => {
  const textAreaStyles = cx(
    invalid ? styles.text_area_classic_invalid : styles.text_area_classic,
    className
  );
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <div>
      <div className={styles.label_classic}>{label}</div>
      <textarea className={textAreaStyles} value={state} onChange={handleChange} />
      {invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </div>
  );
};

export default TextArea;
