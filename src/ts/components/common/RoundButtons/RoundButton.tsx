import React, { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './RoundButton.module.css';

export type RoundButtonProps = {
  onclick: MouseEventHandler;
  className?: string;
  icon?: React.ReactElement;
};

const RoundButton = ({ onclick, className, icon }: RoundButtonProps) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      {icon}
    </button>
  );
};

export default RoundButton;
