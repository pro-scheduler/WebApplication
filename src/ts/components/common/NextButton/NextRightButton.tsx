import { MouseEventHandler } from 'react';

import { AiOutlineRight } from 'react-icons/ai';
import styles from './NextButton.module.css';

interface IButton {
  onclick: MouseEventHandler;
  disabled: any;
}

const NextRightButton = ({ onclick, disabled }: IButton) => {
  return (
    <button className={styles.button} onClick={onclick} disabled={disabled}>
      <AiOutlineRight style={{ fontSize: '400%', margin: '0 auto' }} />
    </button>
  );
};

export default NextRightButton;
