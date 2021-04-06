import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './PlusButton.module.css';
import { AiOutlinePlus } from 'react-icons/ai';

interface Button {
  onclick: MouseEventHandler;
  className: any;
}

const PlusButton = ({ onclick, className }: Button) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      <AiOutlinePlus />
    </button>
  );
};

export default PlusButton;
