import { AiOutlineRight } from 'react-icons/ai';
import cx from 'classnames';
import styles from './ArrowButton.module.css';
import { MouseEventHandler } from 'react';

export type RightArrowButtonProps = {
  onclick: MouseEventHandler;
  disabled: boolean;
  className?: string;
  style?: any;
};

const RightArrowButton = ({ onclick, disabled, className, style = {} }: RightArrowButtonProps) => {
  const buttonStyles = cx(styles.arrowButton, className);
  return (
    <button className={buttonStyles} onClick={onclick} disabled={disabled} style={style}>
      <AiOutlineRight style={{ fontSize: '320%', margin: '0 auto' }} />
    </button>
  );
};

export default RightArrowButton;
