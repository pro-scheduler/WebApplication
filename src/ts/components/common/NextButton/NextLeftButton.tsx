import { MouseEventHandler } from 'react';

import { AiOutlineLeft } from 'react-icons/ai';
import styles from './NextButton.module.css';

interface IButton {
  onclick: MouseEventHandler;
  disabled: any;
}

const NextLeftButton = ({ onclick, disabled }: IButton) => {
  return (
    <button className={styles.button} onClick={onclick} disabled={disabled}>
      <AiOutlineLeft style={{ fontSize: '400%', margin: '0 auto' }} />
    </button>
  );
};

export default NextLeftButton;
