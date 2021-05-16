import React, { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './RoundButton.module.css';

export type RoundButtonProps = {
  onclick: MouseEventHandler;
  className?: string;
  icon?: React.ReactElement;
  disabled?: boolean;
};

const RoundButton = ({ onclick, className, icon, disabled }: RoundButtonProps) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick} disabled={disabled}>
      {icon}
    </button>
  );
};

export default RoundButton;
