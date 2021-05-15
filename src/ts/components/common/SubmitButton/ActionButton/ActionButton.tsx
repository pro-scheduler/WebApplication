import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './ActionButton.module.css';

interface IButton {
  onclick: MouseEventHandler;
  text: any;
  className?: any;
  disabled?: boolean;
}

const ActionButton = ({ onclick, text, className, disabled }: IButton) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ActionButton;
