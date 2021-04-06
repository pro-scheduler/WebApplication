import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './RoundButton.module.css';

interface Button {
  onclick: MouseEventHandler;
  className: any;
  icon: any;
}

const RoundButton = ({ onclick, className, icon }: Button) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      {icon}
    </button>
  );
};

export default RoundButton;
