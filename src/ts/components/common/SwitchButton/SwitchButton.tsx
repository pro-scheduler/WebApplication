import React from 'react';
import Switch from 'react-switch';

import { useState } from 'react';
import cx from 'classnames';
import styles from './SwitchButton.module.css';

interface IButton {
  onChange: Function;
  title: string;
  className?: any;
}

const SwitchButton = ({ onChange, title, className }: IButton) => {
  const [checked, setChecked] = useState(true);

  const buttonOnChange = () => {
    setChecked(!checked);
    onChange.call(this);
  };

  const buttonStyles = cx(styles.button, className);

  return (
    <div>
      <p>{title}</p>
      <Switch
        className={buttonStyles}
        onChange={buttonOnChange}
        checked={checked}
        onColor={'#7067CF'}
        offColor={'#B1B1B1'}
        checkedIcon={false}
        uncheckedIcon={false}
        activeBoxShadow={'0 0 2px 3px #7067CF'}
      />
    </div>
  );
};

export default SwitchButton;
