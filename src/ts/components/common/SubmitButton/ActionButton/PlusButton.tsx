import { TiPlus } from 'react-icons/ti';
import styles from './PlusButton.module.css';
import cx from 'classnames';

const PlusButton = ({
  onAdd,
  className,
  hoverText,
}: {
  onAdd: Function;
  className?: string;
  hoverText?: string;
}) => {
  return (
    <div title={hoverText}>
      <TiPlus className={cx(styles.plusIcon, className)} onClick={() => onAdd()} />
    </div>
  );
};

export default PlusButton;
