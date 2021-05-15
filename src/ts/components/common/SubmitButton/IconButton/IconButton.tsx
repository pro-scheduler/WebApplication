import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './IconButton.module.css';

export type IconButtonProps = {
  redirectTo: string;
  text: string;
  className?: string;
  icon?: JSX.Element;
  disabled?: boolean;
};

const IconButton = ({ redirectTo, text, className, icon, disabled }: IconButtonProps) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);

  return (
    <Link to={redirectTo}>
      <button className={buttonStyles} type="submit" disabled={disabled}>
        {icon} {text}
      </button>
    </Link>
  );
};

export default IconButton;
