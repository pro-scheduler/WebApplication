import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './ActionButton.module.css';

export type ActionButtonProps = {
  onclick: MouseEventHandler;
  text: string;
  className?: string;
  disabled?: boolean;
  color?: string;
};

const ActionButton = ({ onclick, text, className, disabled, color }: ActionButtonProps) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);
  return (
    <button
      className={buttonStyles}
      style={{ backgroundColor: color ? color : 'var(--bright-green)' }}
      type="submit"
      onClick={onclick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ActionButton;
