import { TiPlus } from 'react-icons/ti';
import styles from './DeleteButton.module.css';
import cx from 'classnames';

const DeleteButton = ({ onDelete, className }: { onDelete: Function; className?: string }) => {
  return (
    <div>
      <TiPlus className={cx(styles.deleteCross, className)} onClick={() => onDelete()} />
    </div>
  );
};

export default DeleteButton;
