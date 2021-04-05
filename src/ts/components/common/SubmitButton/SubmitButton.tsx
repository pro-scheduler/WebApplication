import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './SubmitButton.module.css';

interface Button {
  onclick: MouseEventHandler;
  text: String;
  className: any;
}

const SubmitButton = ({ onclick, text, className }: Button) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      {text}
    </button>
  );
};

export default SubmitButton;
