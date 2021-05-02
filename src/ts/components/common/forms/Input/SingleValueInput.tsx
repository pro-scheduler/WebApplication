import styles from './SingleValueInput.module.css';
import { useState } from 'react';

interface SingleValueInputProps {
  label: string;
  valueHandler: Function;
}

const SingleValueInput = ({ label, valueHandler }: SingleValueInputProps) => {
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <>
      <div className={styles.label_classic}>{label}</div>
      <input className={styles.input_classic} type="text" value={state} onChange={handleChange} />
    </>
  );
};

export default SingleValueInput;
