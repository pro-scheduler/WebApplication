import { AiOutlineRight } from 'react-icons/ai';
import styles from './NextButton.module.css';
import { NextButtonProps } from './NextLeftButton';
import cx from 'classnames';

const NextRightButton = ({ onclick, disabled, className }: NextButtonProps) => {
  const buttonStyles = cx(styles.button, className);
  return (
    <button className={buttonStyles} onClick={onclick} disabled={disabled}>
      <AiOutlineRight style={{ fontSize: '400%', margin: '0 auto' }} />
    </button>
  );
};

export default NextRightButton;
