import styles from './RadioButton.module.css';
import cx from 'classnames';
import { MouseEventHandler } from 'react';

export type RadioButtonProps = {
  checked: boolean;
  onChange: MouseEventHandler;
  label: string;
  disabled?: boolean;
};

const RadioButton = ({ checked, onChange, label, disabled = false }: RadioButtonProps) => {
  return (
    <div className={styles.container}>
      <div
        className={cx(styles.radioButton, disabled && styles.disabled)}
        onClick={disabled ? undefined : onChange}
      >
        <div className={cx(styles.tick, checked && styles.checkedTick)} />
      </div>
      <p className={styles.radioButtonLabel}>{label}</p>
    </div>
  );
};

export default RadioButton;
