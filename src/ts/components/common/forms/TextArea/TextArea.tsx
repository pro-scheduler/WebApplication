import styles from './TextArea.module.css';
import { useState } from 'react';
import cx from 'classnames';

type TextAreaProps = { label: string; valueHandler: Function; className: any };
const TextArea = ({ label, valueHandler, className }: TextAreaProps) => {
  const textAreaStyles = cx(styles.text_area_classic, className);
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <div>
      <div className={styles.label_classic}>{label}</div>
      <textarea className={textAreaStyles} value={state} onChange={handleChange} />
    </div>
  );
};

export default TextArea;
