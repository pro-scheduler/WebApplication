import styles from './SquareCheckbox.module.css';
import cx from 'classnames';

export type SquareCheckboxProps = {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label?: string;
};

const SquareCheckbox = ({ checked, setChecked, label }: SquareCheckboxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.checkbox} onClick={() => setChecked(!checked)}>
        <div className={cx(styles.square, checked && styles.checkedSquare)}></div>
      </div>
      {label && <p className={styles.checkboxLabel}>{label}</p>}
    </div>
  );
};

export default SquareCheckbox;
