import { AiOutlineLeft } from 'react-icons/ai';
import cx from 'classnames';
import styles from './ArrowButton.module.css';
import { MouseEventHandler } from 'react';

export type LeftArrowButtonProps = {
  onclick: MouseEventHandler;
  disabled: boolean;
  className?: string;
};

const LeftArrowButton = ({ onclick, disabled, className }: LeftArrowButtonProps) => {
  const buttonStyles = cx(styles.arrowButton, className);
  return (
    <button className={buttonStyles} onClick={onclick} disabled={disabled}>
      <AiOutlineLeft style={{ fontSize: '320%', margin: '0 auto' }} />
    </button>
  );
};

export default LeftArrowButton;
