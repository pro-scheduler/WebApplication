import { AiOutlineRight } from 'react-icons/ai';
import styles from './NextButton.module.css';
import { NextButtonProps } from './NextLeftButton';

const NextRightButton = ({ onclick, disabled }: NextButtonProps) => {
  return (
    <button className={styles.button} onClick={onclick} disabled={disabled}>
      <AiOutlineRight style={{ fontSize: '400%', margin: '0 auto' }} />
    </button>
  );
};

export default NextRightButton;
