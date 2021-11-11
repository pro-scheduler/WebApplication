import { GoArrowUp } from 'react-icons/go';
import React from 'react';
import styles from './ScrollUpIcon.module.css';
import cx from 'classnames';

const ScrollUpIcon = ({ className }: { className?: string }) => {
  return <GoArrowUp className={cx(styles.scrollUpIcon, className)} />;
};

export default ScrollUpIcon;
