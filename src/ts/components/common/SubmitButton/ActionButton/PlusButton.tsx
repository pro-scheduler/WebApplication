import { TiPlus } from 'react-icons/ti';
import styles from './PlusButton.module.css';
import cx from 'classnames';

const PlusButton = ({ onAdd, className }: { onAdd: Function; className?: string }) => {
  return (
    <div className={styles.deleteContainer}>
      <TiPlus className={cx(styles.plusIcon, className)} onClick={() => onAdd()} />
    </div>
  );
};

export default PlusButton;
