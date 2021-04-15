import React from 'react';

import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './IconButton.module.css';

interface IButton {
  redirectTO: string;
  text: string;
  className: any;
  icon: JSX.Element;
}

const IconButton = ({ redirectTO, text, className, icon }: IButton) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <Link to={redirectTO}>
      <button className={buttonStyles} type="submit">
        <div className={styles.content}>
          {icon} {text}
        </div>
      </button>
    </Link>
  );
};

export default IconButton;
