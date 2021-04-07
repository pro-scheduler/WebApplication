import { MouseEventHandler } from 'react';

import cx from 'classnames';
import styles from './SubmitButton.module.css';

interface IButton {
  onclick: MouseEventHandler;
  text: String;
  className: any;
}

const SubmitButton = ({ onclick, text, className }: IButton) => {
  const buttonStyles = cx(styles.button, className);

  return (
    <button className={buttonStyles} type="submit" onClick={onclick}>
      {text}
    </button>
  );
};

export default SubmitButton;
