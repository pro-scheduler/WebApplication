import styles from './TextArea.module.css';
import { useState } from 'react';

type TextAreaProps = { label: string; valueHandler: Function };
const TextArea = ({ label, valueHandler }: TextAreaProps) => {
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <div>
      <div className={styles.label_classic}>{label}</div>
      <textarea className={styles.text_area_classic} value={state} onChange={handleChange} />
    </div>
  );
};

export default TextArea;
