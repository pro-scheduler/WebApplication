import React from 'react';

import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './IconButton.module.css';

export type IconButtonProps = {
  redirectTo: string;
  text: string;
  className?: string;
  icon?: JSX.Element;
};

const IconButton = ({ redirectTo, text, className, icon }: IconButtonProps) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <Link to={redirectTo}>
      <button className={buttonStyles} type="submit">
        {icon} {text}
      </button>
    </Link>
  );
};

export default IconButton;
