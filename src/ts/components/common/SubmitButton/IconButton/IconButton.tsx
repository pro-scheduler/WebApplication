import cx from 'classnames';
import styles from './IconButton.module.css';
import { MouseEventHandler } from 'react';

export type IconButtonProps = {
  redirectTo?: string;
  onClick?: MouseEventHandler;
  text: string;
  className?: string;
  containerClassName?: string;
  icon?: JSX.Element;
  disabled?: boolean;
};

const IconButton = ({ redirectTo, onClick, text, className, icon, disabled }: IconButtonProps) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);

  return (
    <a href={redirectTo}>
      <button className={buttonStyles} type="submit" disabled={disabled} onClick={onClick}>
        {icon} {text}
      </button>
    </a>
  );
};

export default IconButton;
