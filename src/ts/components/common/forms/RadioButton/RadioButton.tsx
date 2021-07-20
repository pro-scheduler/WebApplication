import styles from './RadioButton.module.css';
import cx from 'classnames';
import { MouseEventHandler } from 'react';

export type RadioButtonProps = {
  checked: boolean;
  onChange: MouseEventHandler;
  label: string;
};

const RadioButton = ({ checked, onChange, label }: RadioButtonProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.radioButton} onClick={onChange}>
        <div className={cx(styles.tick, checked && styles.checkedTick)} />
      </div>
      <p className={styles.radioButtonLabel}>{label}</p>
    </div>
  );
};

export default RadioButton;
