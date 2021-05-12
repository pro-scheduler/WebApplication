import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './ActionButton.module.css';

export type ActionButtonProps = {
  onclick: MouseEventHandler;
  text: string;
  className?: string;
};

const ActionButton = ({ onclick, text, className }: ActionButtonProps) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      {text}
    </button>
  );
};

export default ActionButton;
