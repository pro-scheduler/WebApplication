import styles from './SingleValueInput.module.css';
import cx from 'classnames';
import { useState } from 'react';

// interface SingleValueInputProps {
//   label: string;
//   valueHandler: Function;
//   className: any;
// }

const SingleValueInput = ({ label, valueHandler, className }: any) => {
  const [state, setState] = useState('');
  const inputStyles = cx(styles.input_classic, className);

  const handleChange = (event: any) => {
    setState(event.target.value);
    valueHandler(event.target.value);
  };
  return (
    <div>
      <div className={styles.label_classic}>{label}</div>
      <input className={inputStyles} type="text" value={state} onChange={handleChange} />
    </div>
  );
};

export default SingleValueInput;
