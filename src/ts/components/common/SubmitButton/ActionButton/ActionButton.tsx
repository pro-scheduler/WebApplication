import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './ActionButton.module.css';

interface IButton {
  onclick: MouseEventHandler;
  text: any;
  className: any;
}

const ActionButton = ({ onclick, text, className }: IButton) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      {text}
    </button>
  );
};

export default ActionButton;
