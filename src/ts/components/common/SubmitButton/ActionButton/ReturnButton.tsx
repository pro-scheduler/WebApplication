import { IoMdArrowRoundBack } from 'react-icons/io';
import styles from './ReturnButton.module.css';
import cx from 'classnames';

const ReturnButton = ({
  onReturn,
  className,
  hoverText,
}: {
  onReturn: Function;
  className?: string;
  hoverText?: string;
}) => {
  return (
    <div title={hoverText}>
      <IoMdArrowRoundBack className={cx(styles.plusIcon, className)} onClick={() => onReturn()} />
    </div>
  );
};

export default ReturnButton;
