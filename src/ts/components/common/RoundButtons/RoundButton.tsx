import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './RoundButton.module.css';

interface IButton {
  onclick: MouseEventHandler;
  className?: any;
  icon: any;
  disabled?: boolean;
}

const RoundButton = ({ onclick, className, icon, disabled }: IButton) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick} disabled={disabled}>
      {icon}
    </button>
  );
};

export default RoundButton;
