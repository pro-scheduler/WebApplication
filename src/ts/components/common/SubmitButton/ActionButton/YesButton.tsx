import { TiTick } from 'react-icons/ti';
import styles from './YesButton.module.css';
import cx from 'classnames';

const YesButton = ({ onAccept, className }: { onAccept: Function; className?: string }) => {
  return (
    <div>
      <TiTick className={cx(styles.yesButton, className)} onClick={() => onAccept()} />
    </div>
  );
};

export default YesButton;
