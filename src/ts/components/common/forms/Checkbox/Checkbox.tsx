import styles from './Checkbox.module.css';
import { TiTick } from 'react-icons/ti';
import cx from 'classnames';

export type CheckboxProps = {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label: string;
  disabled?: boolean;
};

const Checkbox = ({ checked, setChecked, label, disabled = false }: CheckboxProps) => {
  return (
    <div className={styles.container}>
      <div
        className={cx(styles.checkbox, disabled && styles.disabled)}
        onClick={disabled ? undefined : () => setChecked(!checked)}
      >
        <TiTick className={cx(styles.tick, checked && styles.checkedTick)} />
      </div>
      <p className={styles.checkboxLabel}>{label}</p>
    </div>
  );
};

export default Checkbox;
