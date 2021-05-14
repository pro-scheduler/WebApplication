import { MouseEventHandler } from 'react';

import { AiOutlineLeft } from 'react-icons/ai';
import styles from './NextButton.module.css';
import cx from 'classnames';

export type NextButtonProps = {
  onclick: MouseEventHandler;
  disabled: boolean;
  className?: string;
};

const NextLeftButton = ({ onclick, disabled, className }: NextButtonProps) => {
  const buttonStyles = cx(styles.button, className);
  return (
    <button className={buttonStyles} onClick={onclick} disabled={disabled}>
      <AiOutlineLeft style={{ fontSize: '400%', margin: '0 auto' }} />
    </button>
  );
};

export default NextLeftButton;
