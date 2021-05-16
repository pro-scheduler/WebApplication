import React from 'react';
import Switch from 'react-switch';

import { useState } from 'react';
import cx from 'classnames';
import styles from './SwitchButton.module.css';

export type SwitchButtonProps = {
  onChange: Function;
  title: string;
  className?: string;
};

const SwitchButton = ({ onChange, title, className }: SwitchButtonProps) => {
  const [checked, setChecked] = useState(true);

  const buttonOnChange = () => {
    setChecked(!checked);
    onChange.call(this);
  };

  const buttonStyles = cx(styles.button, className);

  return (
    <>
      <p>{title}</p>
      <Switch
        className={buttonStyles}
        onChange={buttonOnChange}
        checked={checked}
        onColor={'#B1B1B1'}
        offColor={'#7067CF'}
        checkedIcon={false}
        uncheckedIcon={false}
        activeBoxShadow={'0 0 2px 3px #7067CF'}
      />
    </>
  );
};

export default SwitchButton;
