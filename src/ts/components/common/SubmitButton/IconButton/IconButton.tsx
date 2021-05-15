import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './IconButton.module.css';

interface IButton {
  redirectTO: string;
  text: string;
  className?: any;
  icon: JSX.Element;
  disabled?: boolean;
}

const IconButton = ({ redirectTO, text, className, icon, disabled }: IButton) => {
  const buttonStyles = cx(disabled ? styles.button_disabled : styles.button, className);

  return (
    <Link to={redirectTO}>
      <button className={buttonStyles} type="submit" disabled={disabled}>
        {icon} {text}
      </button>
    </Link>
  );
};

export default IconButton;
