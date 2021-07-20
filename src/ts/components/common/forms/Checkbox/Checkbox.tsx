import styles from './Checkbox.module.css';
import { TiTick } from 'react-icons/ti';
import cx from 'classnames';

export type CheckboxProps = {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label: string;
};

const Checkbox = ({ checked, setChecked, label }: CheckboxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.checkbox} onClick={() => setChecked(!checked)}>
        <TiTick className={cx(styles.tick, checked && styles.checkedTick)} />
      </div>
      <p className={styles.checkboxLabel}>{label}</p>
    </div>
  );
};

export default Checkbox;
