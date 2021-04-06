import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './ArrowButton.module.css';
import { BsArrowUpRight } from 'react-icons/bs';

interface Button {
  onclick: MouseEventHandler;
  className: any;
}

const ArrowButton = ({ onclick, className }: Button) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      <BsArrowUpRight />
    </button>
  );
};

export default ArrowButton;
