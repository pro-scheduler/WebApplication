import { TiPlus } from 'react-icons/ti';
import styles from './DeleteButton.module.css';
import cx from 'classnames';

const DeleteButton = ({
  onDelete,
  className,
  hoverText,
}: {
  onDelete: Function;
  className?: string;
  hoverText?: string;
}) => {
  return (
    <div title={hoverText}>
      <TiPlus className={cx(styles.deleteCross, className)} onClick={() => onDelete()} />
    </div>
  );
};

export default DeleteButton;
